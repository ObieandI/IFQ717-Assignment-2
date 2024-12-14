require('dotenv').config();


const knex = require('knex');
const knexConfig = require('./knexfile');

console.log(knexConfig.development.connection); // Log the connection details
const db = knex(knexConfig.development);

db.raw('SELECT 1')
  .then(() => {
    console.log('Database connection successful!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });