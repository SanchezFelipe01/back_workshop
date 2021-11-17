const mongoose = require('mongoose')

let url = "mongodb://localhost:27017/test";

mongoose.connect(url);

let db = mongoose.connection

db.on('error', console.error.bind(console, 'Mongo connection error'))

module.exports = db