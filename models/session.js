const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Session extends Model {}

Session.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  token: DataTypes.TEXT,
}, {
  sequelize,
  underscored: true,
  modelName: 'session',
})

module.exports = Session