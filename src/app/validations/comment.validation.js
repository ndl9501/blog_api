const Joi = require("joi");


const create = {
    body: Joi.object().keys({
        blog_id : Joi.number().min(0).required(),
        customer_id : Joi.number().min(0).required(),
        parent_id : Joi.number().min(0),
        comment_context : Joi.string().required()
    })
}


const update = {
    body: Joi.object().keys({
        comment_context : Joi.string(),
    })
}

module.exports = {
    create,
    update
}