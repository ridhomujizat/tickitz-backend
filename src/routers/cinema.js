const routes = require('express').Router()
const cinemasController = require('../controllers/cinema')
const { runValidation, validationCinema, validationPatchCinema } = require('../helpers/validator')

routes.get('/cinema', cinemasController.listMovie)
routes.post('/cinema', validationCinema, runValidation, cinemasController.createCinemas)
routes.put('/cinema/:id', validationCinema, runValidation, cinemasController.updateGenre)
routes.patch('/cinema/:id', validationPatchCinema, runValidation, cinemasController.patchCinemas)
routes.delete('/cinema/:id', cinemasController.destroyGenre)

module.exports = routes
