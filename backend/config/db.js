require('dotenv').config();

const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

console.log('Knex Config:', knexConfig.development);

module.exports = db;