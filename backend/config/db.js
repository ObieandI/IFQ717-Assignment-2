import 'dotenv/config';
import knex from 'knex';
import knexConfig from './knexfile.js';

// Create and configure knex instance
const db = knex(knexConfig.development);
console.log('Knex Config:', knexConfig.development);

// Export the knex instance as default
export default db;

