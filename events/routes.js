const { Router } = require('express')
const Event = require('./model')
const Ticket = require('../tickets/model')

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

module.exports = router