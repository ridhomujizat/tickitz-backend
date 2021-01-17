const routes = require('express').Router()
const moviesController = require('../controllers/movies')
const { runValidation, validationCreatMovie, validationPatchMovie } = require('../helpers/validator')

routes.get('/movies', moviesController.listMovies)
routes.get('/movies/:id', moviesController.detailMovie)
routes.post('/movies', validationCreatMovie, runValidation, moviesController.createMovie)
routes.put('/movies/:id', validationCreatMovie, runValidation, moviesController.updateMovies)
routes.patch('/movies/:id', validationPatchMovie, runValidation, moviesController.patchMovies)
routes.delete('/movies/:id', moviesController.destroyMovie)

module.exports = routes
