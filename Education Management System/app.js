const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDatabase = require('./config/db');
const handleError = require('./utils/errorHandler');
const authenticationRoutes = require('./routes/authRoutes');
const coursesRoutes = require('./routes/courseRoutes');
const enrollmentsRoutes = require('./routes/enrollmentRoutes');

const app = express();

// Establish database connection
connectDatabase();

// Apply middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Define routes
app.use('/api/auth', authenticationRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/enrollment', enrollmentsRoutes);

// Global error handling middleware
app.use(handleError);

module.exports = app;
