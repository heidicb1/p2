const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'School API',
    description: 'Professor/Student API',
  },
  host: 'localhost:3000',
  schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

