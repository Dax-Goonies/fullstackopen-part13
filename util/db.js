const Sequelize = require('sequelize')
const { DATABASE_URL, TEST_DATABASE_URL } = require('./config')
const { Umzug, SequelizeStorage } = require('umzug')

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
    await runMigrations()
    console.log('connected to the database')
  } catch (err) {
    console.log('failed to connect to the database')
    return process.exit(1)
  }

  return null
}

const migrationConf = {
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
}

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
}
const rollbackMigration = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
}

module.exports = { connectToDatabase, sequelize, rollbackMigration }