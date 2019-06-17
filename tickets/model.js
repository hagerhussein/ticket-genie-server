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
      type: Sequelize.INTEGER,
      allowNull: false
    },
    risk: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 5,
      validate: {
        min: 5,
        max: 95
      }
    }
  },
  {
    tableName: 'tickets'
  }
)


/*async function getAllTickets (){
  await Ticket.findAll()
 console.log (result)
}
console.log(allTickets)*/

Ticket.beforeCreate(function (ticket, options) {
  //ticket.risk = 5

  let time = new Date(ticket.createdAt).getUTCHours()
  if (time >= 9 && time <= 17) {
    return ticket.risk -= 10
  }
  else { ticket.risk += 10 }
})// this is working 

/*Ticket.beforeCreate(function(ticket,options){
 Ticket.findAndCountAll({
   where:  {
    userId :{
      [Op.eq]: ticket.userId}
    }
 })
 .then(function(result){
   if (result> 0) {
     return ticket.risk += 10
   } else {
     return ticket.risk
   }
 })
})

 
/*let totalPrice
Ticket.findAll({
 where:  {
  eventId :{
    [Op.eq]: ticket.eventId}
  },
  group: ['Ticket.id'],
  attributes: [[sequelize.fn('SUM', sequelize.col('ticket.price')), 'total']],
  duplicating: false
})
.then(total => {return totalPrice = total})
.then(console.log(totalPrice))
let numberOfTickets 
let avrgPrice = totalPrice / numberOfTickets
let difOfPrice = avrgPrice - ticket.price
  Ticket.count({
     where:  {
       eventId :{
         [Op.eq]: ticket.eventId}
       }
   })
   .then(function(result) {let  numberOfTickets = result
   })
     .then (console.log(numberOfTickets))
   

     if (difOfPrice > 0) {
       return ticket.risk += difOfPrice
     } if (difOfPrice < 0) {
       return ticket.risk = Math.round(ticket.risk + difOfPrice)
     }
     if (difOfPrice < -10) {
       return ticket.risk = Math.round(ticket.risk - 10)
     } else {
       return ticket.risk
     }*/

    /* sequelize
     .query('SELECT * FROM tickets', {
       model: Ticket,
       mapToModel: true ,
       where:  {
        eventId :{
          [Op.eq]: 1}
        }
    })
     .then(tickets => [[sequelize.fn('sum', sequelize.col('price')), 'total']])
      .then(console.log(result))*/
     
   

Event.hasMany(Ticket)
User.hasMany(Ticket)
Ticket.hasMany(Comment)


module.exports = Ticket 