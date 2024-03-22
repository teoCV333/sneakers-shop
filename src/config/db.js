const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const URL = process.env.MONGODB_URL;
        await mongoose.connect(URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;