const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);


// Test route
app.get('/', (req, res) => {
  res.send('API running 🚀');
});


module.exports = app;