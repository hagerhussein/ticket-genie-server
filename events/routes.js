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


router.get('/events/:id', (req, res, next) => {
  Event
    .findByPk(req.params.id, { include: Ticket, Comment })
    .then(event => {
      if (!event) {
        return res.status(404).send({
          message: `Event does not exist anymore`
        })
      }
      return res.send({ event })
    })
    .catch(error => next(error))
})

router.post('/events', auth, (req, res, next) => {
  Event
    .create(req.body)
    .then(event => {
      if (!event) {
        res.status(404).send({
          message: 'Event cannot be created'
        })
      }
      return res.send({ event })
    })
    .catch(error => next(error))
})
module.exports = router