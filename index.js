const express = require('express');
const connectDB = require('./src/config/db');
const router = require('./src/app/routes');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/', router);


app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});


connectDB();