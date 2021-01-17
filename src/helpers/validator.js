const { check, validationResult } = require('express-validator')

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg
    })
  }
  next()
}

exports.validationCreatMovie = [
  check('name').notEmpty().withMessage('name is required!').isLength({ min: 3, max: 100 }).withMessage('name length must min 3 & max 100!'),
  check('genre').notEmpty().withMessage('genre is required!').isLength({ min: 3, max: 100 }).withMessage('genre length must min 3 & max 100!'),
  check('releaseDate').notEmpty().withMessage('date is required!').isISO8601().toDate().withMessage('realese date invalid value!'),
  check('directed').notEmpty().withMessage('directed is required!').isLength({ min: 3, max: 100 }).withMessage('directed length must min 3 & max 100!'),
  check('duration').isLength({ min: 3, max: 100 }).withMessage('duration length must min 3 & max 100!'),
  check('casts').notEmpty().withMessage('casts is required!').isLength({ min: 3, max: 100 }).withMessage('casts length must min 3 & max 100!'),
  check('description').notEmpty().withMessage('description is required!').isLength({ min: 10, max: 100 }).withMessage('duration length must min 3 & max 100!'),
  check('status').notEmpty().withMessage('status is required!').isIn(['upcoming', 'released']).withMessage('velue status just upcoming & released')
]

exports.validationPatchMovie = [
  check('name').isLength({ min: 3, max: 100 }).optional().withMessage('name length must min 3 & max 100!'),
  check('genre').isLength({ min: 3, max: 100 }).optional().withMessage('genre length must min 3 & max 100!'),
  check('releaseDate').optional().isISO8601().toDate().withMessage('realese date invalid value!'),
  check('directed').isLength({ min: 3, max: 100 }).optional().withMessage('directed length must min 3 & max 100!'),
  check('duration').isLength({ min: 3, max: 100 }).optional().withMessage('duration length must min 3 & max 100!'),
  check('casts').isLength({ min: 3, max: 100 }).optional().withMessage('casts length must min 3 & max 100!'),
  check('description').isLength({ min: 10, max: 100 }).optional().withMessage('duration length must min 3 & max 100!'),
  check('status').isIn(['upcoming', 'released']).optional().withMessage('velue status just upcoming & released')
]
