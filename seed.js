const { sequelize } = require('./util/db')
const { Blog, User, ReadingList } = require('./models')

const seed = async () => {
  await sequelize.authenticate()

  const user1 = await User.create({ username: 'test1@example.com', name: 'Test User 1' })
  const user2 = await User.create({ username: 'test2@example.com', name: 'Test User 2' })

  const blog1 = await Blog.create({ author: 'Dan Abramov', url: 'https://example.com', title: 'Clean React', likes: 34, year: 2020, userId: user1.id })
  const blog2 = await Blog.create({ author: 'Bob Martin', url: 'https://example.com', title: 'Clean Code', likes: 5, year: 2019, userId: user1.id })
  const blog3 = await Blog.create({ author: 'Jami Kousa', url: 'https://example.com', title: 'Relational databases', likes: 10, year: 2021, userId: user2.id })

  await ReadingList.create({ userId: user1.id, blogId: blog2.id, read: false })
  await ReadingList.create({ userId: user1.id, blogId: blog3.id, read: true })

  console.log('Seeded:')
  console.log('user1:', user1.username, '(id', user1.id + ')')
  console.log('user2:', user2.username, '(id', user2.id + ')')

  await sequelize.close()
}

seed()