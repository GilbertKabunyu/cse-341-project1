const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const contactRoutes = require('./routes/contactRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/api/contacts', contactRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});