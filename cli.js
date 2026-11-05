const { sequelize } = require('./util/db')

const Blog = require('./models/blog')

const main = async () => {
  const blogs = await Blog.findAll()
  blogs.forEach(blog => {
    console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
  })
  await sequelize.close()
}

main()