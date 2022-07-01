
const httpStatus = require("http-status");
const commentModel = require("../models/comment.model");
const ApiError = require("../utils/apiError");

const findAll = async () => {
    return commentModel.findAll()
        .then(rs => rs)
}

const findById = async (id) => {
    return commentModel.findById(id)
        .then(rs => rs)
}

const create = async (body) => {
    // console.log(body);
    const newComment = new commentModel({
        comment_context: body.comment_context
    })
    if(body.blog_id){
        newComment.blog_id = body.blog_id
    }
    if(body.customer_id){
        newComment.customer_id = body.customer_id
    }
    if(body.parent_id){
        newComment.parent_id = body.parent_id
    }
    return await commentModel.create(newComment);

}

const remove = async (id) => {
    return await commentModel.delete(id);
}

const update = async (body, comment_id)=>{
    if(!comment_id){
        throw new ApiError(httpStatus.BAD_REQUEST, "id is not null")
    }
    const updateComment = new commentModel({
        comment_context: body.comment_context
    })
    console.log(updateComment);
    return await commentModel.update(updateComment, comment_id);
}

module.exports = {
    findAll,
    findById,
    create,
    remove,
    update
}