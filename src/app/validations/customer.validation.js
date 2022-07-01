const Joi = require("joi");


const create = {
    body: Joi.object().keys({
        name : Joi.string().required(),
        email : Joi.string().email().required(),
        phonenumber : Joi.string().min(5).max(13).required(),
        addr : Joi.string().required(),
        gender : Joi.number().min(0).max(1).required(),
        password : Joi.string().required().min(5).max(20),
        pre_id : Joi.number()
    })
}


const update = {
    body: Joi.object().keys({
        name : Joi.string(),
        email : Joi.string().email(),
        phonenumber : Joi.string().min(5).max(13),
        addr : Joi.string(),
        gender : Joi.number().min(0).max(1),
        password : Joi.string().min(5).max(20),
        pre_id : Joi.number()
    })
}

module.exports = {
    create,
    update
}