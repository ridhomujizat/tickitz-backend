const routes = require('express').Router()
const genreController = require('../controllers/genre')
const { runValidation, validationGenre } = require('../helpers/validator')

routes.get('/genre/:name', genreController.listGenreMovie)
routes.get('/genre', genreController.listGenre)
routes.post('/genre', validationGenre, runValidation, genreController.createGenre)
routes.patch('/genre/:id', validationGenre, runValidation, genreController.updateGenre)
routes.delete('/genre/:id', genreController.destroyGenre)

module.exports = routes
