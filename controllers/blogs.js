const router = require('express').Router()

const { Blog } = require('../models')

// GET: Fetch all blogs
router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

// POST: Add a new blog to be DB
router.post('/', async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body)
    res.json(blog)
  } catch(error) {
    next(error)
  }
})

// GET: Fetch a specific blog by its id
router.get('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

// DELETE: Remove a blog by its id
router.delete('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    await blog.destroy()
  }
  res.status(204).end()
})

// PUT: Update a blog content
router.put('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
      blog.likes = req.body.likes
      await blog.save()
      res.json(blog)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router