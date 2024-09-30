const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json'; // Output file for Swagger JSON
const endpointsFiles = ['./routes/contactRoutes.js']; // Your routes file

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API to manage contacts',
    },
    host: 'localhost:5000', // Change if deploying
    schemes: ['http'],
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server'); // Your main server file
});