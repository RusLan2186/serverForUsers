

const express = require('express')
const cors = require('cors');
const todoRouter = require('./src/routes/todo.route');


const app = express()
app.use(cors())

app.use('/todos', express.json(), todoRouter)
app.listen(3005, () => {
  console.log('run server');

})

// import * as todoService from './src/services/todo.service'

// let todos = [
//   { id: '1', title: 'Nodejs', completed: false },
//   { id: '2', title: 'JavaScript', completed: false },
//   { id: '3', title: 'Express', completed: true },
// ];

// app.get('/todos', cors(), todoController.get)
// app.get('/todos/:id', todoController.getOne)
// app.post('/todos', express.json(), todoController.create)
// app.delete('/todos/:id', todoController.remove)
// app.put('/todos/:id', express.json(), todoController.update)
// app.patch('/todos', express.json(), (req, res) => {
//   const { action } = req.query;

//   if (action === 'delete') {
//     todoController.removeMany(req, res)
//     return
//     // if (!Array.isArray(ids)) {
//     //   res.sendStatus(422)
//     //   return
//     // }
//     // if (!ids.every((id) => todoService.getById(id))) {
//     //   throw new Error()
//     // }
//     // // const newTodos = todos.filter(todo => !ids.includes(todo.id))

//     // todoService.removeMany(ids)

//     // // todos = newTodos
//     // res.sendStatus(204)
//     // return
//   }

//   if (action === 'update') {
//     todoController.updateMany(req, res)
//     return
//     // if (!Array.isArray(items)) {
//     //   res.sendStatus(422)
//     //   return
//     // }

//     // todoService.updatesMany(items)
//     // // for (const { id, title, completed } of items) {
//     // //   const todo = todos.find(item => item.id === id)
//     // //   if (!todo) continue;

//     // //   Object.assign(todo, { title, completed })
//     // // }

//     // res.sendStatus(204)
//     // return
//   }
//   res.sendStatus(422)
// })

// app.get('/todos', (req, res) => {
//   // res.send(todos)
//   res.send(todoService.getAll())
// })

// app.get('/todos/:id', (req, res) => {
//   const { id } = req.params;
//   // const todo = todos.find(item => item.id === id)
//   const todo = todoService.getById(id)
//   if (!todo) {
//     res.sendStatus(404)
//     return
//   }
//   res.send(todo)
// })




// app.post('/todos', express.json(), (req, res) => {
//   const { title } = req.body;
//   if (!title) {
//     res.sendStatus(422)
//   }

//   // const todo = {
//   //   title,
//   //   id: v4(),
//   //   completed: false

//   // }
//   const todo = todoService.create(title)
//   res.statusCode = 201;
//   // todos.push(todo)
//   res.send(todo)
// })

// app.delete('/todos/:id', (req, res) => {
//   const { id } = req.params;
//   // const newTodos = todos.filter(item => item.id !== id)
//   if (!todoService.getById(id)) {
//     res.sendStatus(404)
//     return
//   }
//   todoService.remove(id)

//   // if (newTodos.length === todos.length) {
//   //   res.sendStatus(404)

//   //   return
//   // }
//   // todos = newTodos;
//   res.sendStatus(204)
// })

// app.put('/todos/:id', express.json(), (req, res) => {
//   const { id } = req.params;
//   const { title, completed } = req.body;
//   // const todo = todos.find(item => item.id === id)
//   const todo = todoService.getById(id)
//   if (!todo) {
//     res.sendStatus(404)
//     return
//   }

//   if (typeof title !== 'string' || typeof completed !== 'boolean') {
//     res.sendStatus(422)
//     return
//   }
//   // Object.assign(todo, { title, completed })
//   const updatedTodo = todoService.update({id, title, completed})
//   res.send(updatedTodo)
// })





