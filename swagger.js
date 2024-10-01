const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json'; // Output file for Swagger JSON
const endpointsFiles = ['./routes/contactRoutes.js']; // Your routes file

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API to manage contacts',
    },
    host: 'cse-341-project1-b4de.onrender.com',
    schemes: ['https'],
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server'); // Your main server file
});