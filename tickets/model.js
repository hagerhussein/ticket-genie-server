const Sequelize = require('sequelize')
const sequelize = require('../db')
const Event = require('../events/model')
const User = require('../users/model')
const Comment = require('../comments/model')

const Op = Sequelize.Op

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
/*console.log ('hello')
let tickets = () =>{
Ticket.findAll()
.then({return tickets})
} 
console.log(tickets)*/

 /*let authorRisk = Ticket 
  .findAndCountAll({
    where: { 
      userId: Ticket.userId
    }
  })
  .then(function(tickets){
  let authorRisk = tickets
  })

console.log(authorRisk)
  /*console.log(authorRisk)
  => {
    if(tickets === 1) {
      return auhtorRisk = Ticket.risk += 5
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
}*/
  

 /*async function getAllTickets (){
  const result = await Ticket.findAll()
  console.log (result)
 }
 console.log(allTickets)*/

Ticket.beforeCreate(function(ticket, options){
 Ticket.findAndCountAll({
   where:  {
    userId :{
      [Op.eq]: ticket.userId}
    }
 })
 .then(function(result){
   if (result === 0) {
     return ticket.risk += 10
   } else {
     return ticket.risk
   }
 })
})


Event.hasMany(Ticket)
User.hasMany(Ticket)
Ticket.hasMany(Comment)


module.exports = Ticket 