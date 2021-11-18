const User = require('../models/user')
const Note = require('../models/note')

exports.create = async (req, res, next) => {
   if(req.user.username != req.body.username)
   {
        return res.status(401).send('you cannot create notes with a different username than yours')
   }
    const userExist = await User.findOne({username: req.body.username});

    if(!userExist){
        return res.status("409").send("User does not exists");
    }

    let note = new Note({
        title: req.body.title,
        comment: req.body.comment,
        username: req.body.username, 
    })
   
    note.save(err => {
        if(err)
            return next(err)
        res.send('note created successfully')
    })
}

exports.index = (req, res , next) => {
    Note.find({username: req.user.username}, (err, notes) => {
        if (err)
            return next(err)
        res.send(notes)
    })
}

exports.show = (req, res , next) => {
    Note.findById(req.params.id, (err, note) => {
        if (err)
            return next(err)
        if(req.user.username == note.username){
            res.send(note)
        }else{
            return res.status(401).send("you can't see other users notes")
        }
    })
}

exports.update = (req, res , next) => {
    Note.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, note) => {
        if (err)
            return next(err)
        res.send('Note updated successfully')
    })
}

exports.delete = (req, res , next) => {
    Note.findByIdAndRemove(req.params.id, (err, note) => {
        if (err)
            return next(err)
        res.send('Note deleted successfully')
    })
}

