const mongoose = require('mongoose')

let url = process.env.MONGO_URI;

mongoose.connect(url);

let db = mongoose.connection

db.on('error', console.error.bind(console, 'Mongo connection error'))

module.exports = db