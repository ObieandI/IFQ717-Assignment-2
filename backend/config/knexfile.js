// import 'dotenv/config';
// import path from 'path';
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });


// Resolve to the root folder where migrations and seeds should be located
const path = require('path');
const BASE_PATH = path.resolve(__dirname, '..');

console.log('Knexfile loaded');
console.log('Migrations directory:', path.resolve(BASE_PATH, 'migrations'));
console.log('Database host:', process.env.DB_HOST); // Debug to ensure .env is loaded correctly

export default {
  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',  // Localhost IP address
      user: 'root',  // MySQL username
      password: 'J5K5UY+XpuD6VPt',  // MySQL password
      database: 'tourism',  // The database you want to connect to
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'), // Fix path to migrations folder
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'), // Fix path to seeds folder
    },
  },
};
