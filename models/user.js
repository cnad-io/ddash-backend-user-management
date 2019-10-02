'use strict'

const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  process.env.DB_NAME || 'database',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || 'password', {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mariadb'
  })

const Model = Sequelize.Model

class User extends Model {}

User.init({
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'users'
})

if (process.env.NODE_ENV !== 'production') {
  sequelize.sync()
}

module.exports = User
