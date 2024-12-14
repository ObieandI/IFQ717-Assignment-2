const db = require('../../config/db'); // Knex instance
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Validate role
    const validRoles = ['hotel', 'government'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role. Only "hotel" and "government" roles can register.' });
    }

    // Check if the username is already taken
    const existingUser = await db('users').where({ username }).first();
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    await db('users').insert({
      username,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = { register };