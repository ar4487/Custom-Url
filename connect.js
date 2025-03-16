const mongoose = require('mongoose')
//const Schema = mongoose.Schema;

async function connecttoMongoDB(url) {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        };
        
        await mongoose.connect(url, options);
        console.log('MongoDB connection established successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}

module.exports={
    connecttoMongoDB,
}