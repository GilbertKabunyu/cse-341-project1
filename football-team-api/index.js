// index.js
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const dotenv = require('dotenv');
const teamRoutes = require('./routes/team');
const authRoutes = require('./routes/auth');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');

dotenv.config();

const app = express();
app.use(express.json());
app.use(passport.initialize());
require('./config/passport')(passport); 

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));