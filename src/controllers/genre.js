const listGenre = require('../helpers/listGenre')
const data = require('../helpers/listMovies')

module.exports = {
  listGenreMovie: (req, res) => {
    const { name } = req.params
    console.log(name)

    let results = []

    results = data.filter(movie => {
      return movie.genre.includes(name)
    })

    return res.json({
      success: true,
      message: 'Details of Movie',
      results
    })
  },
  listGenre: (req, res) => {
    return res.json({
      success: true,
      message: 'list of genre',
      listGenre
    })
  },
  createGenre: (req, res) => {
    const valueBody = req.body

    const results = [{ id: listGenre.length + 1, ...valueBody }]
    listGenre.push(results[0])

    return res.json({
      success: true,
      message: 'New Genre Created!',
      results
    })
  },
  updateGenre: (req, res) => {
    const { id } = req.params
    const valueBody = req.body

    const result = listGenre.find(genre => genre.id === id)
    if (!result) return res.status(404).json({ success: false, message: 'Genre not found!' })

    result.name = valueBody.name

    return res.json({
      success: true,
      message: `Update Genre ${id} Success!`,
      result
    })
  },
  destroyGenre: (req, res) => {
    const { id } = req.params

    const result = listGenre.find(genre => genre.id === id)
    if (!result) return res.status(404).json({ success: false, message: 'Genre not found!' })

    const index = id - 1
    listGenre.splice(index, 1)

    return res.json({
      success: true,
      message: `Delete Genre ${id} Success!`
    })
  }
}
