const todoService = require('../services/todo.service');

const get = async (req, res) => {
  const todos = await todoService.getAll();
  res.send(
    todos.map(todo => todoService.normalize(todo))
  )
}

const getOne = async (req, res) => {
  const { id } = req.params;
  const todo = await todoService.getById(id)
  if (!todo) {
    res.sendStatus(404)
    return
  }
  // res.send(todo)
  res.send(todoService.normalize(todo))
}

const create = async (req, res) => {
  const { title } = req.body;
  if (!title) {
    res.sendStatus(422)
  }
  const todo = await todoService.create(title)
  res.statusCode = 201;

  res.send(todo)
}

const remove = async (req, res) => {
  const { id } = req.params;
  if (!(await todoService.getById(id))) {
    res.sendStatus(404)
    return
  }
  await todoService.remove(id)

  res.sendStatus(204)
}

const update = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const todo = await todoService.getById(id)
  if (!todo) {
    res.sendStatus(404)
    return
  }

  if (typeof title !== 'string' || typeof completed !== 'boolean') {
    res.sendStatus(422)
    return
  }

  await todoService.update({ id, title, completed })
  const updatedTodo = await todoService.getById(id)
  res.send(updatedTodo)
}

const removeMany = (req, res, next) => {
  if (req.query.action !== 'delete') {
    next()
    return
  }
  const { ids } = req.body;
  if (!Array.isArray(ids)) {
    res.sendStatus(422)
    return
  }
  if (!ids.every((id) => todoService.getById(id))) {
    throw new Error()
  }
  todoService.removeMany(ids)
  res.sendStatus(204)
  return
}

const updateMany = (req, res, next) => {
  if (req.query.action !== 'update') {
    next()
    return
  }
  const { items } = req.body;
  if (!Array.isArray(items)) {
    res.sendStatus(422)
    return
  }

  todoService.updatesMany(items)


  res.sendStatus(204)
  return
}
module.exports = {
  get, getOne, create, remove, update, removeMany, updateMany
};