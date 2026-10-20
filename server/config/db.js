const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/darkwear';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500, // Quick timeout to avoid hanging if offline
    });
    isConnected = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (error) {
    isConnected = false;
    console.warn(`[Database] MongoDB connection warning: ${error.message}`);
    console.warn(`[Database] Falling back to high-fidelity persistent file store in server/data/ until MongoDB is configured.`);
    return false;
  }
};

const getDBStatus = () => ({
  isConnected,
  uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/darkwear',
  mode: isConnected ? 'MongoDB (Mongoose)' : 'Local High-Speed Persistent Store'
});

module.exports = { connectDB, getDBStatus };
