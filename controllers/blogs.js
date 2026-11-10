const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const { Blog, User, ReadingList } = require('../models')
const { SECRET } = require('../util/config')
const { blogFinder, tokenExtractor } = require('../util/middleware')

// GET: Fetch all blogs
router.get('/', async (req, res) => {
  // Return all blogs with filtering (search)
  const where = {}

  if (req.query.search) {
    where[Op.or] = [
      { title: { [Op.iLike]: `%${req.query.search}%` } },
      { author: { [Op.iLike]: `%${req.query.search}%` } }
    ]
  }

  // Return all blogs
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where,
    order: [['likes', 'DESC']]
  })
  res.json(blogs)
})

// POST: Add a new blog to be DB
router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({...req.body, userId: user.id})
    res.json(blog)
  } catch(error) {
    next(error)
  }
})

// GET: Fetch a specific blog by its id
router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

// DELETE: Remove a blog by its id
router.delete('/:id', blogFinder, tokenExtractor, async (req, res) => {
  if (!req.blog) {
    return res.status(404).end()
  }
  
  if (req.blog.userId !== req.decodedToken.id) {
    return res.status(403).json({ error: 'only the creator can delete this blog' })
  }

  await req.blog.destroy()
  res.status(204).end()
})

// PUT: Update a blog content
router.put('/:id', blogFinder, async (req, res, next) => {
  try {
    if (req.blog) {
      req.blog.likes = req.body.likes
      await req.blog.save()
      res.json(req.blog)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router