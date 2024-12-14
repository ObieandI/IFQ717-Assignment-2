const db = require('../../config/db'); // Knex instance
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Load JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Find the user in the database
    const user = await db('users').where({ username }).first();
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 2. Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 3. Generate a JWT token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 4. Send the token to the client
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { login };