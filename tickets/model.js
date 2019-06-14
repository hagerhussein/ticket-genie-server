const Sequelize = require('sequelize')
const sequelize = require('../db')
const Event = require('../events/model')
const User = require('../users/model')
const Comment = require('../comments/model')

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
    },
    risk: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 5,
      validate:{
        min: 5,
        max: 95
      }
    }
  },
  {
    tableName: 'tickets'
  }
)

/*let authorRisk = () => {
  Ticket 
  .findAndCountAll({
    where: { 
      userId: Ticket.userId
    }
  })
  .then(tickets => {
    if(tickets === 1) {
      return auhtorRisk = Ticket.risk =+ 5
    } else{
      return Ticket.risk
    }
  })
  .catch(err => {
    console.error(err)})
}

let priceRisk = () => {
  let prices = []
  let total = 

  Ticket
  .findAndCountAll({
    where : {
      eventId: Ticket.eventId
    }
  })
  .then(tickets => prices.push(tickets.price))
  .then(total = prices.reduce((accum, currentPrice) => {
  return accum + currentPrice,0}))
  .then(averagePrice = total/tickets)
  return averagePrice
  .then(averagePrice => { let diff = averagePrice - Ticket.price
  })
  }
  
 

Ticket.beforeBulkUpdate(function(options){
 

})*/


Event.hasMany(Ticket)
User.hasMany(Ticket)
Ticket.hasMany(Comment)


module.exports = Ticket 