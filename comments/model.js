const Sequelize = require('sequelize')
const sequelize = require('../db')
const User = require('../users/model')
const Ticket = require('../tickets/model')
const Event = require('../events/model')

const Comment = sequelize.define('comments',
  {
    text: {
      type: Sequelize.TEXT
    },
    time: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  },
  {
    tableName: 'comments'
  }
)
//Ticket.hasMany(Comment)
User.hasMany(Comment)
//Event.hasMany(Comment)

module.exports = Comment