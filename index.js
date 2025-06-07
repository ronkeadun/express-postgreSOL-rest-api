require('dotenv').config()
const express = require('express')
const cors = require('cors')

const userRoutes = require('./userRoutes');

const app = express();
const port = process.env.PORT || 3000;

//middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use('/users', userRoutes);

// 404 handler for invalid routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
