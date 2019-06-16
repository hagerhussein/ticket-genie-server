const { Router } = require('express')
const Ticket = require('../tickets/model')
const User = require('../users/model')
const auth = require('../users/authMiddleware')
const Comment = require('./model')
const Event = require('../events/model')

const router = new Router()

router.post('/comments', auth, (req, res, next) => {
  const { userId, ticketId } = req.body
  Comment
    .create(req.body)
    .then(comment => {
      User
        .findByPk(userId)
        .then(user => {
          user
            .setComment(comment)
            .then(() => comment.addUser(user))
        })
    }
    )
   .then(comment => {
      Ticket
        .findByPk(ticketId)
        .then(ticket => {
          ticket
            .setComment(comment)
            .then(() => comment.addTicket(ticket))
        })

    })
    .then(comment => {
      res.status(201).send(comment)
    })
    .catch(error => next(error))
})

module.exports = router