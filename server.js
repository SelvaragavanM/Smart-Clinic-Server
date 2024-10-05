const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('dev'));

// MongoDB connection
const uri = "mongodb+srv://akashrajendran:aakashrajendran2004@cluster0.gbnhe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Import routes
const patientRoutes = require('./routes/patient');
const appointmentRoutes = require('./routes/appointment');
const doctorRoutes = require('./routes/doctor');  // Example: Add more routes as needed
const inventoryRoutes = require('./routes/inventory');
const prescriptionRoutes = require('./routes/prescription');
const medicalTestRoutes = require('./routes/medicalTest');
const reportRoutes = require('./routes/report');
const telemedicineRoutes = require('./routes/telemedicine');
const billingRoutes = require('./routes/billing');
const patientPortalRoutes = require('./routes/patientPortal');

// Use routes
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/medicalTests', medicalTestRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/telemedicine', telemedicineRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/patientPortal', patientPortalRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Medecro API');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
