import mongoose from 'mongoose';

const mongoDB = process.env.MONGODB_URI;

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export default db;
