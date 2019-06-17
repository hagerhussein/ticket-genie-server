const { Router } = require('express')
const Ticket = require('../tickets/model')
const User = require('../users/model')
const auth = require('../users/authMiddleware')
const Comment = require('./model')
const Event = require('../events/model')

const router = new Router()

router.post('/comments', auth, (req, res, next) => {
  const { ticketId } = req.body
  Comment
    .create(req.body.text)
    .then(comment => (
      comment
        .set(ticketId))
      .then(comment => {
        if (!comment) {
          res.status(404).send({
            message: 'Comment cannot be created'
          })
        }
        return res.send({ comment })
      })
      .catch(error => next(error))
    )
})


module.exports = router