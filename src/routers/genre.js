const routes = require('express').Router()
const genreController = require('../controllers/genre')

routes.get('/genre/:name', genreController.listGenreMovie)

module.exports = routes
