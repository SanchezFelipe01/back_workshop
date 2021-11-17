const joi = require('joi');

const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        const valid = error === undefined;

        if(valid){
            next();
        }else{
            const {details} = error
            const message = details.map(q => q.message).join(',')
            console.log('error', message);
            res.status(422).send({error: message})
        }
    }
}

module.exports = validate;