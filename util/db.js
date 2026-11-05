const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = process.env.NODE_ENV === 'production'
  ? new Sequelize(DATABASE_URL, {
      dialectOptions: {
        ssl: { require: true, rejectUnauthorized: false },
      },
    })
  : new Sequelize(DATABASE_URL)

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('connected to the database')
  } catch (err) {
    console.log('failed to connect to the database')
    return process.exit(1)
  }

  return null
}

module.exports = { connectToDatabase, sequelize }