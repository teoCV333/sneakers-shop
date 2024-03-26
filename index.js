const express = require('express');
const swaggerUi = require('swagger-ui-express');

require('dotenv').config();
const connectDB = require('./src/config/db');
const router = require('./src/app/routes');
const { specs } = require('./src/config/swaggerConfig');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/', router);

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});

connectDB();