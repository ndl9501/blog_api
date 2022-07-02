const Joi = require("joi");


const login = {
    body: Joi.object().keys({
        email : Joi.string().required().email(),
        password : Joi.string().required(),
    })
}


const register = {
    body: Joi.object().keys({
        email : Joi.string().required().email(),
        password : Joi.string().required(),
    })
}

module.exports = {
    login,
    register
}