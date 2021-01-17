module.exports = {
  listGenreMovie: (req, res) => {
    const { name } = req.params
    console.log(name)

    const data = require('../helpers/listMovies')
    let results = []

    results = data.filter(movie => {
      return movie.genre.includes(name)
    })

    return res.json({
      success: true,
      message: 'Details of Movie',
      results
    })
  }
}
