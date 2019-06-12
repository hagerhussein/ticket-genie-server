const { Router } = require('express')
const User = require('./model')
const bcrypt = require('bcrypt')
const { toJWT } = require('./jwt')

const router = new Router()

router.post('/users', (req, res, next) => {
  /*const user = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  }*/
  User
    .create(req.body)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: `Please enter a valid email`
        })
      }
      return res.status(201).send({ userId: user.id })
    })
    .catch(error => next(error))
})

router.post('/login', (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    res.status(400).send({
      message: 'Please enter a correct email and password'
    })
  } else {
    User
      .findOne({
        where: {
          email: req.body.email
        }
      })
      .then(user => {
        if (!user) {
          res.status(400).send({
            message: 'User with that email does not exist'
          })
        } else if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({
            jwt: toJWT({ userId: user.id })
          })
        } else {
          res.status(400).send({
            message: 'Password is incorrect'
          })
        }
      })
      .catch(err => {
        console.error(err)
        res.status(500).send({
          message: 'Something went wrong'
        })
      })
  }
})

module.exports = router

