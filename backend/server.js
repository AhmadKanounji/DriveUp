const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const driveRoutes = require('./routes/drive');
const authMiddleware = require('./middleware/authMiddleware'); // Import the middleware

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json()); 

// Connect to MongoDB without the deprecated options
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/auth', authRoutes); // Authentication routes such as signin, signup, don't require middleware

// Apply the auth middleware only to drive routes
app.use('/drive', authMiddleware, driveRoutes); // Drive routes require a user to be authenticated

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
