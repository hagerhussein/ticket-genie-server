const { Router } = require('express')
const Event = require('./model')
const Ticket = require('../tickets/model')
const auth = require('../users/authMiddleware')
const User = require('../users/model')

const router = new Router()

router.get('/events', (req, res, next) => {
  Event
    .findAll()
    .then(events => {
      res.send({ events })
    })
    .catch(error => next(error))
})

router.get('/events/:id', (req, res, next) => {
  Event
    .findByPk(req.params.id, { include: [Ticket] })
    .then(event => {
      if (!event) {
        return res.status(404).send({
          message: `Event does not exist anymore`
        })
      }
      return res.send(event)
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