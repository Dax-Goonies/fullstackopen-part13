require('dotenv').config()
const express = require('express')
const { Sequelize } = require('sequelize')

const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

app.get('/', async (req, res) => {
  res.send('Hello World!')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

sequelize.authenticate()
  .then(() => console.log('Connected to Postgres'))
  .catch((err) => console.error('Failed to connect:', err))