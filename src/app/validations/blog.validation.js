const Joi = require("joi");


const create = {
    body: Joi.object().keys({
        title : Joi.string().required(),
        context : Joi.string().required(),
        category_id: Joi.number().min(0).required()
    })
}


const update = {
    body: Joi.object().keys({
        title : Joi.string().required(),
        context : Joi.string().required(),
        category_id: Joi.number().min(0).required()
    })
}

module.exports = {
    create,
    update
}