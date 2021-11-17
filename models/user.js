const mongoose = require('mongoose')

const Schema = mongoose.Schema

let UserSchema = Schema({
    name: {type: String, require: true, max:100},
    username: {type: String, require:true},
    password: {type: String, require: true},
    email: {type: String, require:true},
    createdAt: {type: Date, require:true},
    token: {type: String},
    options: {type: String, require: false}
})

module.exports = mongoose.model('User', UserSchema)