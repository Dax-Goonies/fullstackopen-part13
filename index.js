const express = require('express')
const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const { errorHandler } = require('./util/middleware')
const authorsRouter = require('./controllers/authors')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const logoutRouter = require('./controllers/logout')
const readingListsRouter = require('./controllers/readingLists')
const resetRouter = require('./controllers/reset')
const usersRouter = require('./controllers/users')


const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.sendStatus(200)
})

app.use('/api/authors', authorsRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)
app.use('/api/logout', logoutRouter)
app.use('/api/readinglists', readingListsRouter)
app.use('/api/reset', resetRouter)
app.use('/api/users', usersRouter)

app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()