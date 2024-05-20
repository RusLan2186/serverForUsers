const fs = require('fs/promises')
const path = require('path')
const getId = require('../utils/getCreateMaxId')

// const client = require('../../db')
const sequelize = require('../../db');
const { DataTypes, Op } = require('sequelize');

const Todo = sequelize.define('Todo', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,

  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'todos',
  updatedAt: false,
  // createdAt:false
}
);



let todos = [
  { id: '1', title: 'Nodejs', completed: false },
  { id: '2', title: 'JavaScript', completed: false },
  { id: '3', title: 'Express', completed: true },
];

async function read() {
  const filePath = path.resolve('data', 'todos.json')

  const data = await fs.readFile(filePath, 'utf-8')

  return JSON.parse(data)
}

async function write(todos) {
  const filePath = path.resolve('data', 'todos.json')

  await fs.writeFile(filePath, JSON.stringify(todos, null, 2), 'utf-8')

}

const normalize = ({ id, title, completed }) => {
  return {
    id, title, completed
  }
}

const getAll = async () => {
  // return await read()
  // const result = await client.query(` SELECT * FROM todos `)
  const result = await Todo.findAll({
    order: [['createdAt', 'DESC']]
  });
  return result
  // return result.rows
}

const getById = async (id) => {
  return Todo.findByPk(id)
  // const result = await client.query(`
  //  SELECT * FROM todos 
  //  WHERE id =  $1
  //  `, [id]
  // )
  // return result.rows[0] || null;
}

const create = async (title) => {
  // const result = await client.query(` SELECT * FROM todos `)
  const result = await Todo.findAll();
  const id = getId.getCreateMaxId(result);

  return Todo.create({ id, title })
  //   await client.query(`
  //   INSERT INTO todos (id, title)
  //   VALUES ($1, $2)
  //  `, [id, title])

  //   return await getById(id)
}

const update = async ({ id, title, completed }) => {
  await Todo.update({ title, completed }, { where: { id } })
  //   await client.query(`
  //     UPDATE todos
  //     SET title= $1, completed=$2
  //     WHERE id = $3   
  //  `, [title, completed, id])

  // return await getById(id)
}

const remove = async (id) => {

  await Todo.destroy({
    where: {
      id
    }
  })
  // const todos = await read()
  // await write(todos.filter(todo => todo.id !== id))
  // await client.query(`
  //     DELETE FROM todos
  //     WHERE id = $1
  //   `, [id]);

  // return await getById(id)

}

const removeMany = async (ids) => {
  await Todo.destroy({
    where: {
      id: {
        [Op.in]: ids
      }
    }
  })
  // const indexes = ids.map((item, i) => `$${i + 1}`)
  // await client.query(`
  // DELETE from todos
  // WHERE id in (${indexes.join(`,`)})
  // `, ids)
  // for (const id of ids) {
  //   await remove(id)
  // }
  // todos = todos.filter(todo => !ids.includes(todo.id))
}

const updatesMany = async (todos) => {
  return await sequelize.transaction(async (t) => {
    for (const { id, title, completed } of todos) {
      await Todo.update({ title, completed }, { where: { id }, transaction: t })
    }
  })
}

module.exports = {
  getAll, getById, create, update, remove, removeMany, updatesMany, read, write, normalize
};