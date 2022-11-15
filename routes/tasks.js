const express = require("express")
const taskRouter = express.Router()

const {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask
} = require("../controllers/tasks")

taskRouter.route("/").get(getAllTasks).post(createTask)

taskRouter.route("/:id").get(getTask).patch(updateTask).delete(deleteTask)

module.exports = taskRouter
