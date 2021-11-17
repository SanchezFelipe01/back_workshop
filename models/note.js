const mongoose = require('mongoose')

const Schema = mongoose.Schema

let NoteSchema = Schema({
    title: {type: String, require: true},
    comment: {type: String, require: true},
    username: {type: String, require:true, min: 6},
})

module.exports = mongoose.model('Note', NoteSchema)