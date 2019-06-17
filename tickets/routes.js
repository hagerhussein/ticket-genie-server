const { Router } = require('express')
const Ticket = require('./model')
const Comment = require('../comments/model')
const User = require('../users/model')
const auth = require('../users/authMiddleware')

const router = new Router()

router.get('/tickets', (req, res, next) => {
  Ticket
    .findAll({ include: [Comment] })
    .then(tickets => {
      res.send({ tickets: tickets })
    })
    .catch(error => next(error))
  })


router.get('/tickets/:id', (req, res, next) => {
  Ticket
    .findByPk(req.params.id, { include: [Comment] })
    .then(ticket => {
      if (!ticket) {
        res.status(404).send({
          message: 'Ticket is not found'
        })
      }
      return res.send({ticket})
    })
    .catch(error => next(error))
})

router.post('/tickets',auth,(req, res, next) => {
  const { userId } = req.body
  const {eventId} = req.body
  Ticket
    .create(req.body)
    .then(ticket => (
          ticket
            .set(userId))
            .then(() => ticket.set(eventId))
            .then(ticket => {
              if (!ticket) {
                res.status(404).send({
                  message: 'Ticket cannot be created'
                })
              }
              return res.send({ticket})
            })
            .catch(error => next(error))
        )
      })

router.put('/tickets/:id', auth, (req, res) => {
  Ticket
    .findByPk(req.params.id, { include: [User] })
    .then(ticket => {
      if (ticket.userId === req.body.userId) {
        return ticket.update(req.body).then(ticket => res.send(ticket))
      }
      else {
        return res.status(404).send({
          message: `You are not allowed to change this ticket`
        })
      }
    })
})

module.exports = router