const { CustomAPIError } = require("../errors/custom-error")
const errorLogger = (err, req, res, next) => {
  console.error("\x1b[31m", err)
  next(err)
}

const errorResponder = (err, req, res, next) => {
  res.header("Content-Type", "application/json")
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
}

const invalidPathHandler = (err, req, res, next) => {
  res.status(500).send({
    message: `${req.originalUrl} is not a valid path`
  })
}

module.exports = {
  errorLogger,
  errorResponder,
  invalidPathHandler
}
