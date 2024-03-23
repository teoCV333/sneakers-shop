require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const router = require('./src/app/routes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

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
    apis: [`${path.join(__dirname, "./src/app/routes/*.js")}`], // Ruta al directorio que contiene tus rutas Express
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/', router);


app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});


connectDB();