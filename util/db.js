const Sequelize = require('sequelize')
const { DATABASE_URL, TEST_DATABASE_URL } = require('./config')

const databaseUrl = process.env.TESTING === 'true' ? TEST_DATABASE_URL : DATABASE_URL

const sequelize = process.env.NODE_ENV === 'production'
  ? new Sequelize(databaseUrl, {
      dialectOptions: {
        ssl: { require: true, rejectUnauthorized: false },
      },
    })
  : new Sequelize(databaseUrl)

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