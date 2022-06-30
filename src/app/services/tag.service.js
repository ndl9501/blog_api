const TagModel = require("../models/tag.model");
const ApiError = require("../utils/apiError");
const slug = require("slug");

const createTag = async (body) => {
    // console.log(body);
    const newTag = new TagModel({
        tag_name: body.name,
        tag_description: body.description
    })
    // console.log(newTag);
    return await TagModel.create(newTag);

}

const findAll = async () => {
    return await TagModel.findAll();
}

const findById = async (id) => {
    return await TagModel.findById(id);
}

const update = async (body, id) => {
    const updateTag = {};
    if(body?.name){
        updateTag.tag_name = body.name;
        updateTag.slug = slug(body.name, "_");
    }
    if(body?.description){
        updateTag.tag_description = body.description;
    }
    if(body?.published){
        updateTag.published = body.published;
    }
    console.log(updateTag);
    return await TagModel.update(updateTag, id);
}

const remove = async (id) => {
    return await TagModel.delete(id);
}
module.exports = {
    createTag,
    findAll,
    findById,
    remove,
    update
}