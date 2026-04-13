const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//Import Routes
const responseRoutes = require('./api/routes/responseRoutes'); // manage responses
const authRoutes = require('./api/routes/authRoutes'); // login
const ticketRoutes = require('./api/routes/ticketRoutes'); //  manage tickets

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true })); 

//DATABASE CONNECTION
mongoose.connect('mongodb://127.0.0.1:27017/helpdeskDB')
  .then(() => {
    console.log('Successfully connected to MongoDB Compass!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

//API ROUTES
app.get('/', (req, res) => {
  res.send('Hybrid Helpdesk Backend is running!');
});

// Mount routes
app.use('/api/responses', responseRoutes);
app.use('/api', authRoutes);
app.use('/api/tickets', ticketRoutes);

//START SERVER
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});