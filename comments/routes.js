const { Router } = require('express')
const Ticket = require('../tickets/model')
const User = require('../users/model')
const auth = require('../users/authMiddleware')

const router = new Router()

router.post('/comments/:id', auth, (req, res) => {
  const { userId, eventId } = req.body

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
      Event
        .findByPk(eventId)
        .then(event => {
          event
            .setComment(comment)
            .then(() => comment.addEvent(event))
        })

    })
    .then(() => Comment.findAll({
      include: [Event, User]
    }))
    .then(comments => {
      res.status(201).send(comments)
    })
})

module.exports = router