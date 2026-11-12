const router = require('express').Router()
const { Blog, ReadingList, Session, User } = require('../models')

// POST: Reset the database
router.post('/', async (req, res) => {
  await Session.destroy({ where: {}, truncase: true, cascade: true })
  await ReadingList.destroy({ where: {}, truncate: true, cascade: true })
  await Blog.destroy({ where: {}, truncate: true, cascade: true })
  await User.destroy({ where: {}, truncate: true, cascade: true })
  res.status(204).end()
})

module.exports = router