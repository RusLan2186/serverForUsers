// const pkg = require('pg');
// const { Client } = pkg;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', '123456', {
  host: 'localhost',
  dialect: 'postgres'
});

async function testConnection() {
  try {
    await sequelize.authenticate();

  } catch (error) {
    console.error('error');
  }
}

// testConnection();


module.exports = sequelize;


//  const client = new Client({
//   host: 'localhost',
//   user: 'postgres',
//   password: '123456',
//   database: 'postgres'
// })
// async function connectToDatabase() {
//   try {
//     await client.connect();
//   } catch (error) {
//     console.error('Error connecting to PostgreSQL database:', error);
//   }
// }

// connectToDatabase()

// module.exports = client;
