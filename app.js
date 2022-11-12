const express = require("express")
const morgan = require("morgan")
const { urlencoded } = require("body-parser")
const {
  errorLogger,
  errorResponder,
  invalidPathHandler
} = require("./middlewares/errHandler")


const app = express()

app.use(express.json())
app.use(urlencoded({ extended: false }))
app.use(morgan("dev"))






app.all("*", (req, res, next) => {
  next()
})

app.use(errorLogger)
app.use(errorResponder)
app.use(invalidPathHandler)

module.exports = app
