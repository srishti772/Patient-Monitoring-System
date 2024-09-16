const express = require('express');
const bodyParser = require('body-parser');
const patientRoutes = require('./routes/patient');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Routes
app.use('/api', patientRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
