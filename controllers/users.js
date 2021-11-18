const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.create = async (req, res, next) => {
   
    const userExist = await User.findOne({username: req.body.username});

    if(userExist){
        return res.status("409").send("User already exists");
    }

    let encryptedPassword = await bcrypt.hash(req.body.password, 10);

    let user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: encryptedPassword,
        identification: req.body.identification,
        photo: req.body.photo,
        active: req.body.active,
    })

   
    user.save(err => {
        if(err)
            return next(err)
        res.send('user created successfully')
    })
}

exports.index = (req, res , next) => {
    User.find({}, (err, users) => {
        if (err)
            return next(err)
        res.send(users)
    })
}

exports.show = (req, res , next) => {
    User.findById(req.params.id, (err, user) => {
        if (err)
            return next(err)
        res.send(user)
    })
}

exports.update = (req, res , next) => {
    if(req.user.user_id == req.params.id){
        User.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, user) => {
            if (err)
                return next(err)
            res.send('User updated successfully')
        })
    }else{
        res.status(401).send('You cannot update other users, only yourself')
    }
}

exports.delete = (req, res , next) => {
    if(req.user.user_id == req.params.id){
        User.findByIdAndRemove(req.params.id, (err, user) => {
            if (err)
                return next(err)
            res.send('User deleted successfully')
        })
    }
    else{
        res.status(401).send('You cannot delete other users, only yourself')
    }
    
}

exports.login = async (req, res, next) => {

    const { username, password } = req.body

    if(!username || !password){
        res.status("400").send("username and password are required")
    }

    const user = await User.findOne({username});

    
    if(user && await bcrypt.compare(password, user.password)){
        const token = jwt.sign( {user_id: user._id, username}, "secret", {expiresIn: "2h"} );
            
        user.token = token;

        res.status(200).json(user);

    }else{
        res.status(400).send("Invalid credentials");
    }
    

}