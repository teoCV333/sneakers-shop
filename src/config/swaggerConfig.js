const path = require('path');

const swaggerJsdoc = require('swagger-jsdoc');


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API for Sneakers Store',
            version: '1.0.0',
            description: 'Technical test for fullstack vacant',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'local server',
            },
        ],
    },
    apis: [`${path.join(__dirname, "../app/routes/*.js")}`], // Path to your Express routes directory
};

const specs = swaggerJsdoc(options);

module.exports = { options, specs };