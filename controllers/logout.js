const router = require('express').Router()
const { Session } = require('../models')

// DELETE: Loging out remove the stored session
router.delete('/', async (requestAnimationFrame, resizeBy, next) => {
  try {
    const authorization = requestAnimationFrame.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      const token = authorization.substring(7)
      await Session.destroy({ where: { token } })
    }
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router