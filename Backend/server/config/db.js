const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log('App connected successfully');
        console.log(`Database Connected: ${conn.connection.host}`);
        console.log('MongoDB connecting successfully');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;