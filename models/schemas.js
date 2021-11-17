const joi = require('joi');

const schemas = {

    user: joi.object().keys({
        firstname: joi.string().alphanum().max(30).required(),
        lastname: joi.string().alphanum().max(30).required(),
        username: joi.string().alphanum().min(8).required(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
        identification: joi.number().required(),
        photo: joi.string().uri().required(),
        active: joi.boolean().required(),
        token: [joi.string(), joi.number()]
        
    }),

    note: joi.object().keys({
        title: joi.string().min(1).alphanum().required(),
        comment: joi.string().min(1).required(),
        username: joi.string().alphanum().min(8)
    })

}

module.exports = schemas;