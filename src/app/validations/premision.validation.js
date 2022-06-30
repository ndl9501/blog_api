const Joi = require("joi");


const create = {
    body: Joi.object().keys({
        name : Joi.string().required(),
        description : Joi.string().required(),
    })
}


const update = {
    body: Joi.object().keys({
        name : Joi.string(),
        description : Joi.string(),
    })
}

module.exports = {
    create,
    update
}