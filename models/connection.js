
const mongoose = require('mongoose');
require('dotenv').config();

const DUCKDUCKGOOSE = process.env.DUCKDUCKGOOSE;


// connect to our db (database)
// console.log(process.env.DUCKDUCKGOOSE)
mongoose.connect(DUCKDUCKGOOSE)

mongoose.connection
    .on('open', () => console.log('connected to mongoose'))
    .on('close', () => console.log('disconnected to mongoose'))
    .on('error', (error) => console.log(error))

module.exports = mongoose;

