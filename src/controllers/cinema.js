const listCinemas = require('../helpers/listCinemas')

module.exports = {
  listMovie: (req, res) => {
    return res.json({
      success: true,
      message: 'list of cinemas',
      listCinemas
    })
  },
  createCinemas: (req, res) => {
    const valueBody = req.body

    const results = [{ id: listCinemas.length + 1, ...valueBody }]
    listCinemas.push(results[0])

    return res.json({
      success: true,
      message: 'New Cinemas Created!',
      results
    })
  },
  updateGenre: (res, req) => {
    const { id } = req.params
    const valueBody = req.body

    const result = listCinemas.find(cinema => cinema.id === id)
    if (!result) return res.status(404).json({ success: false, message: 'Cinema not found!' })

    result.cinema = valueBody.cinema
    result.address = valueBody.address
    result.price = valueBody.price

    return res.json({
      success: true,
      message: `Update Cinema ${id} Success!`,
      result
    })
  },
  patchCinemas: (req, res) => {
    const { id } = req.params
    const { cinema, address, price } = req.body

    const result = listCinemas.find(cinema => cinema.id === id)
    if (!result) return res.status(404).json({ success: false, message: 'Cinema not found!' })

    if (cinema) result.cinema = cinema
    if (address) result.address = address
    if (price) result.params = price

    return res.json({
      success: true,
      message: `Update Cinema ${id} success`,
      result
    })
  },
  destroyGenre: (req, res) => {
    const { id } = req.params

    const result = listCinemas.find(genre => genre.id === id)
    if (!result) return res.status(404).json({ success: false, message: 'Cinema not found!' })

    const index = id - 1
    listCinemas.splice(index, 1)

    return res.json({
      success: true,
      message: `Delete Cinema ${id} Success!`
    })
  }
}
