const mongoose = require('mongoose');

const db = async () => {
   const URL = 'mongodb://localhost:27017/Event-Management'

    try {
        await mongoose.connect(URL);
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error: ", err.message); // log the error message
    }
};
module.exports=db;
