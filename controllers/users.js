const router = require('express').Router()

const { User, Blog } = require('../models')

// GET: Fetch all users
router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  })
  res.json(users)
})

// POST: Create new user
router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(error) {
    next(error)
  }
})

// GET: Find a user with its id
router.get('/:id', async (req, res) => {
  const readingListWhere = {}

  if (req.query.read !== undefined) {
    readingListWhere.read = req.query.read === 'true'
  }

  const user = await User.findByPk(req.params.id, {
    include: {
      model: Blog,
      as: 'readings',
      attributes: ['id', 'url', 'title', 'author', 'likes', 'year'],
      through: {
        as: 'readingList',
        attributes: ['id', 'read'],
        where: readingListWhere,
      },
      required: false,
    },
  })

  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

// PUT: Change user's name
router.put('/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username : req.params.username } })
    if (user) {
      user.name = req.body.name
      await user.save()
      res.json(user)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router