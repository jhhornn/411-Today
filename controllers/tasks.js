const Task = require("../models/tasks")
const asyncWrapper = require("../middlewares/async")
const { createCustomError, CustomAPIError } = require("../errors/custom-error")

const createTask = asyncWrapper(async (req, res, next) => {
  const body = req.body
  const task = await Task.create(body)
  res.status(201).json({ task })
})

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({})
  res.status(200).json({ tasks })
})

const getTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params
  const task = await Task.findOne({ _id: taskId })
  if (!task) {
    return next(createCustomError(`No task with id: ${taskId}`, 404))
  }
  res.status(200).json({ task })
})

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params
  const body = req.body
  const task = await Task.findOneAndUpdate({ _id: taskId }, body, {
    new: true,
    runValidators: true
    // overwrite: true, //! totally update or overwrite the existing task
  })
  //! runValidators makes sure that the validation set in the model schema is followed in the update
  if (!task) {
    return next(createCustomError(`No task with id: ${taskId}`, 404))
    //   return res.status(404).json({ msg: `No task with id: ${taskId}` })
  }
  res.status(200).json({ task })
})

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params
  const task = await Task.findOneAndDelete({ _id: taskId })
  if (!task) {
    return next(createCustomError(`No task with id: ${taskId}`, 404))
    //   return res.status(404).json({ msg: `No task with id: ${taskId}` })
  }
  res.status(200).json({ task })
})

module.exports = {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask
}
