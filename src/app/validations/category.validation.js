const Joi = require("joi");


const create = {
    body: Joi.object().keys({
        title : Joi.string().required(),
        description : Joi.string().required(),
        parent_id : Joi.number().min(0).max(1),
        published: Joi.number().min(0).max(1)
    })
}


const update = {
    body: Joi.object().keys({
        title : Joi.string(),
        description : Joi.string(),
        parent_id : Joi.number().min(0).max(1),
        published: Joi.number().min(0).max(1)
    })
}

module.exports = {
    create,
    update
}