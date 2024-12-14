const jwt = require('jsonwebtoken');

// Reusable function to verify roles
const verifyRole = (role) => (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Format: Bearer <token>
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== role) {
      return res.status(403).json({ error: `Forbidden: ${role} users only` });
    }

    req.user = decoded; // Attach the decoded token payload to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(`Error verifying ${role} token:`, error);
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Export role-specific middleware
module.exports = {
  verifyAdmin: verifyRole('admin'),
  verifyGovernment: verifyRole('government'),
  verifyHotel: verifyRole('hotel'),
};