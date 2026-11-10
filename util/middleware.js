const jwt = require('jsonwebtoken')
const { SECRET } = require('./config.js')

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ error: error.errors.map(e => e.message) })
  }

  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'malformed JSOn in request body' })
  }

  next(error)
}

// Check clearance with bearer header
const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

// Find blog with its id
const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

module.exports = { blogFinder, errorHandler, tokenExtractor }