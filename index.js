const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()
const port = process.env.PORT || 4000
app
.use(cors())
.use(bodyParser.json())
.listen(port, () => console.log(`Listening on port ${port}`))