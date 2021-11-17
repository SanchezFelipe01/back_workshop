const { number, boolean } = require('joi')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

let UserSchema = Schema({
    firstname: {type: String, require: true, max:30},
    lastname: {type: String, require: true, max: 30},
    username: {type: String, require:true, min: 6},
    password: {type: String, require: true},
    identification: {type: Number, require: true},
    photo: {type: String, require: true},
    active: {type: Boolean, require:true},
    token: {type: String}
})

module.exports = mongoose.model('User', UserSchema)