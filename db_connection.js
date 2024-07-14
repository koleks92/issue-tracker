require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;



const db_connection = async() => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
        });
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
        process.exit(1);
    }
};


module.exports = db_connection;
