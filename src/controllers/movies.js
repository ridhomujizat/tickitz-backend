const { LIMIT_DATA, APP_URL } = process.env
const data = require('../helpers/listMovies')

module.exports = {
  listMovies: (req, res) => {
    const { limit = LIMIT_DATA, search = null } = req.query
    const params = req.params
    console.log(params)
    let { page = 1 } = req.query
    if (typeof (page) !== 'number') {
      page = Number(page)
    }

    const paging = (page * limit) - limit
    const nextPage = ((page + 1) * limit) - limit
    const nextPageOffset = limit * nextPage
    let nextPageData = []
    const offset = limit * page

    let results = []

    if (search) {
      results = data.filter(movie => {
        console.log(movie.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        return movie.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      })
      nextPageData = results.slice(nextPage, nextPageOffset)
      results = results.slice(paging, offset)
    } else {
      nextPageData = data.slice(nextPage, nextPageOffset)
      results = data.slice(paging, offset)
    }

    return res.json({
      success: true,
      message: 'List of Movies',
      results,
      pageInfo: {
        totalData: results.length,
        currentPage: page,
        nextLink: nextPageData.length > 0 ? `${APP_URL}/movies?page=${page + 1}` : null,
        prevLink: page > 1 ? `${APP_URL}/movies?page=${page - 1}` : null
      }
    })
  },
  detailMovie: (req, res) => {
    console.log(req.params)
    const { id } = req.params
    const result = data.find(movie => movie.id === id)

    if (!result) return res.status(404).json({ success: false, message: 'Movie not found!' })

    return res.json({
      success: true,
      message: 'Details of Movie',
      result
    })
  },
  createMovie: (req, res) => {
    const valueBody = req.body

    const results = [{ id: data.length + 1, ...valueBody, genre: valueBody.genre.split(', ') }]
    data.push(results[0])

    return res.json({
      success: true,
      message: 'New Movie Created!',
      results
    })
  },
  updateMovies: (req, res) => {
    const { id } = req.params
    const valueBody = req.body

    const result = data.find(movie => movie.id === id)
    if (!result) return res.status(404).json({ success: false, message: 'Movie not found!' })

    result.name = valueBody.name
    result.genre = valueBody.genre.split(', ')
    result.releaseDate = valueBody.releaseDate
    result.directed = valueBody.directed
    result.duration = valueBody.duration
    result.casts = valueBody.casts
    result.description = valueBody.description
    result.status = valueBody.status

    return res.json({
      success: true,
      message: `Update Movies ${id} Success!`,
      result
    })
  },
  patchMovies: (req, res) => {
    const { id } = req.params
    const { name, genre, releaseDate, directed, duration, casts, description, status } = req.body

    const result = data.find(movie => movie.id === id)
    if (!result) return res.status(404).json({ success: false, message: 'Movie not found!' })

    if (name) result.name = name
    if (genre) result.genre = genre
    if (releaseDate) result.releaseDate = releaseDate
    if (directed) result.directed = directed
    if (duration) result.duration = duration
    if (casts) result.casts = casts
    if (duration) result.duration = duration
    if (description) result.description = description
    if (status) result.status = status
    return res.json({
      success: true,
      message: `Update Movies ${id} Success!`,
      result
    })
  },
  destroyMovie: (req, res) => {
    const { id } = req.params

    const result = data.find(movie => movie.id === id)
    if (!result) return res.status(404).json({ success: false, message: 'Movie not found!' })

    const index = id - 1
    data.splice(index, 1)

    return res.json({
      success: true,
      message: `Delete Movies ${id} Success!`
    })
  }
}
