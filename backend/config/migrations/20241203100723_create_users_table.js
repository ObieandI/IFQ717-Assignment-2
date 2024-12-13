/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary(); // Primary key
        table.string('username').notNullable().unique(); // Unique username
        table.string('password').notNullable(); // Password (hashed)
        table.string('role').notNullable(); // User role (e.g., admin, hotel, government)
        table.timestamps(true, true); // Automatically managed created_at and updated_at columns
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
