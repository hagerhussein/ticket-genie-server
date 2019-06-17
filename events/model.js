const Sequelize = require('sequelize')
const sequelize = require('../db')
const User = require('../users/model')



const Event = sequelize.define('events',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    picture: {
      type: Sequelize.STRING,
    },
    startDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      field: 'start_date'
    },
    endDate: {
      type: Sequelize.DATEONLY,
      field: 'end_date'
    }
  },
  {
    timestamps: false,
    tableName: 'events'
  }
)
User.hasMany(Event)

module.exports = Event