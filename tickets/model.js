const Sequelize = require('sequelize')
const sequelize = require('../db')
const Event = require('../events/model')
const User = require('../users/model')

const Ticket = sequelize.define('tickets',
  {
    picture: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.DECIMAL,
      allowNull: false
    }
  },
  {
    tableName: 'tickets'
  }
)

Event.hasMany(Ticket)
User.hasMany(Ticket)

module.exports = Ticket