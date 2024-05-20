const express = require('express')
const cors = require('cors');
const todoController = require('../controllers/todo.controller')

 const router = express.Router()

router.get('/', cors(), todoController.get)
router.get('/:id', todoController.getOne)
router.post('/', todoController.create)
router.delete('/:id', todoController.remove)
router.put('/:id', todoController.update)

const isAction = (action) => {
 return (req, res, next) => {
    if (req.query.action === action) {
      next()
      return 
    } else {
      next ('route')
    }
  }
}

router.patch('/', isAction('delete'), todoController.removeMany)
router.patch('/',isAction('update'), todoController.updateMany)


// router.patch('/', (req, res) => {
//   const { action } = req.query;

//   if (action === 'delete') {
//     todoController.removeMany(req, res)
//     return
//   }

//   if (action === 'update') {
//     todoController.updateMany(req, res)
//     return
  
//   }
//   res.sendStatus(422)
// })


module.exports = router;
