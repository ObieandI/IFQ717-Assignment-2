require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const path = require('path');

// Define the base path
const BASE_PATH = path.resolve(__dirname, '../');

console.log('Knexfile loaded');
console.log('Migrations directory:', path.resolve(BASE_PATH, 'migrations'));
console.log('Database host:', process.env.DB_HOST); // Debug to ensure .env is loaded correctly

const knexConfig = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: path.resolve(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.resolve(BASE_PATH, 'seeds'),
    },
  },
};

module.exports = knexConfig;
