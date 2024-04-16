const express = require('express');
const app = express();
const mongoose = require('mongoose');

const Fruit = require('./models/fruit');
const User = require('./models/user');

const fs = require('fs');
const cors = require('cors');

// Read SSL certificate
const cert = fs.readFileSync('keys/certificate.pem');
const options = {
  ssl: true
};


// MongoDB connection string
const connstring = 'mongodb+srv://st10131118:RVZzpOzTXR4Y41MW@cluster0.odjy1cf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const fruitRoutes = require('./routes/fruit');
const userRoutes = require('./routes/user');

// Connect to MongoDB
mongoose.connect(connstring, { useNewUrlParser: true, useUnifiedTopology: true, ...options })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
    });

// CORS options
const corsOptions = {
    origin: '*', // Update this with the appropriate origin
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    methods: 'GET, POST, PUT, DELETE'
};

// Middleware for CORS
app.use(cors(corsOptions));
app.use(express.json());

const urlprefix = '/api';

app.get(urlprefix + '/', (req, res) => {
    res.send('Hello World');
});

app.use(urlprefix + '/fruits', fruitRoutes);
app.use(urlprefix + '/users', userRoutes);

module.exports = app;
