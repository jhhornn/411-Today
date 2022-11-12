const express = require("express")
const morgan = require("morgan")
const taskRoute = require("./routes/tasks")
const {
  errorLogger,
  errorResponder,
  invalidPathHandler
} = require("./middlewares/errHandler")


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan("dev"))

app.use("/api/v1/tasks", taskRoute)






app.all("*", (req, res, next) => {
  next()
})

app.use(errorLogger)
app.use(errorResponder)
app.use(invalidPathHandler)

module.exports = app
