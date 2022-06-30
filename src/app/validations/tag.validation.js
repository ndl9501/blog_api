const Joi = require("joi");


const create = {
    body: Joi.object().keys({
        name : Joi.string().required(),
        description : Joi.string().required(),
        published: Joi.number().min(0).max(1)
    })
}


const update = {
    body: Joi.object().keys({
        name : Joi.string(),
        description : Joi.string(),
        published: Joi.number().min(0).max(1)
    })
}

module.exports = {
    create,
    update
}