const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const eventsRouter = require('./events/routes')
const usersRouter =  require('./users/routes')


const app = express()
const port = process.env.PORT || 4000
app
.use(cors())
.use(bodyParser.json())
.use(eventsRouter)
.use(usersRouter)
.listen(port, () => console.log(`Listening on port ${port}`))