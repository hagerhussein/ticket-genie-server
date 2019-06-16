const { Router } = require('express')
const Event = require('./model')
const Ticket = require('../tickets/model')
const auth = require('../users/authMiddleware')
const User = require('../users/model')
const Sequelize = require('sequelize')
const Comment = require('../comments/model')

const Op = Sequelize.Op
const router = new Router()

router.get('/events', (req, res, next) => {
  Event
  .findAll({
    where: {
      endDate: {
        [Op.gte]: new Date()
      }
    }
  })
  .then(events => {
    res.send({ events: events })
  })
  .catch(error => next(error))
})
/*router.get('/events/:page', (req, res, next) => {
  let limit = req.query.limit || 9
  let offset = req.query.offset || 0
  Event
    .findAndCountAll({where:{
      endDate: {
        [Op.gte]: Sequelize.NOW // new Date()
      }
    }})
    .then(events => {
      let page = req.params.page
      let totalPages = Math.ceil(events.count / limit)
      offset = limit * (page - 1)
      Event
      .findAll({limit, offset})
      .then(events => {
        res.send({ events:events })
      })
    })
    .catch(error => next(error))
})*/

router.get('/events/:id', (req, res, next) => {
  Event
    .findByPk(req.params.id, { include: Ticket, Comment })
    .then(event => {
      if (!event) {
        return res.status(404).send({
          message: `Event does not exist anymore`
        })
      }
      return res.send({event})
    })
    .catch(error => next(error))
})

router.post('/events', auth, (req, res) => {
  const { userId } = req.body

  Event
    .create(req.body)
    .then(event => {
      User
        .findByPk(userId)
        .then(user => {
          user
            .setEvent(event)
            .then(() => event.addUser(user))
            .then(() => Event.findAll({
              include: [{ model: User }]
            }))
            .then(events => {
              res.status(201).send(events)
            })
        })
    })
})
module.exports = router