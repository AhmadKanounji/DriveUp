const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const driveRoutes = require('./routes/drive');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

app.use(express.json()); 
app.use(express.static('public'));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


app.use('/auth', authRoutes); 
app.use('/drive', authMiddleware, driveRoutes);
app.use('/public', express.static('public'));





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
