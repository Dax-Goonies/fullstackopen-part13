const router = require('express').Router()
const { Blog, User, ReadingList } = require('../models')
const { tokenExtractor} = require('../util/middleware')

// POST: Adding blog to reading list
router.post('/', async (req, res, next) => {
  try {
    const { blogId, userId } = req.body

    const blog = await Blog.findByPk(blogId)
    const user = await User.findByPk(userId)

    if (!blog) {
      return res.status(400).json({ error: 'invalid blog id'})
    }

    if (!user) {
      return res.status(400).json({ error: 'invalid user id'})      
    }

    const existing = await ReadingList.findOne({ where: blogId, userId })
    if (existing) {
      return res.status(400).json({ error: 'blog already in reading list' })
    }
    
    const reading = await ReadingList.create({ blogId, userId, read: false })
    res.status(201).json(reading)
  } catch (error) {
    next(error)
  }
})

// PUT: Add/Remove blog to the reading list
router.put('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const reading = await ReadingList.findByPk(req.params.id)

    if (!reading) {
      return res.status(404).end()
    }

    if (reading.userId !== req.decodedToken.id) {
      return res.status(403).json({ error: 'you can only mark your own reading list items as read' })
    }

    reading.read = req.body.read
    await reading.save()
    res.json(reading)
  } catch (error) {
    next(error)
  }
})

module.exports = router