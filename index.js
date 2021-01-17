const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()
const { APP_PORT } = process.env

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors('*'))

// routes
app.use('/', require('./src/routers/movies'))
app.use('/', require('./src/routers/genre'))

app.get('/', (req, res) => {
  const data = {
    success: true,
    message: 'bakcend is running well'
  }
  res.send(data)
})

app.listen(APP_PORT, () => {
  console.log(`app is running on port ${APP_PORT}`)
})
