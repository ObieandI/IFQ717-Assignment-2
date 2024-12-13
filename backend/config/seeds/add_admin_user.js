const bcrypt = require('bcryptjs');

exports.seed = async function (knex) {
  // Define the admin user details
  const adminUser = {
    username: 'adminuser', // Change as needed
    password: await bcrypt.hash('securepassword', 10), // Replace with a secure password
    role: 'admin',
  };

  // Check if the admin user already exists
  const existingUser = await knex('users').where({ username: adminUser.username }).first();
  if (existingUser) {
    console.log('Admin user already exists. Skipping seed.');
    return;
  }

  // Insert the new admin user
  await knex('users').insert(adminUser);
  console.log('Admin user added successfully.');
};
