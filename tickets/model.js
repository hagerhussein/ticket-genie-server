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



Ticket.beforeCreate(function (ticket, options) {
  let time = new Date(ticket.createdAt).getUTCHours()
  if (time >= 9 && time <= 17) {
    return ticket.risk -= 10
  }
  else { ticket.risk += 10 }
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