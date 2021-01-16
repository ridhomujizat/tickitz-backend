const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded)

app.get('/', (req, res) => {
  const data = {
    success: true,
    message: 'bakcend is running well'
  }
  res.send(data)
})

app.listen(8080, () => {
  console.log('app is running on port 8080')
})
