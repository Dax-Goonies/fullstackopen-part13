const router = require('express').Router()
const { sequelize } = require('../util/db')
const { Blog } = require('../models')

// GET: Fetch all authors (author, blogs count, likes count) order by likes
router.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('id')), 'blogs'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
    ],
    group: ['author'],
    order: [[sequelize.fn('SUM', sequelize.col('likes')), 'DESC']]
  })
  res.json(authors)
})

module.exports = router