const blog_fileModel = require("../models/blog_file.model");
const ApiError = require("../utils/ApiError");

const create = async (file_name, blog_id) => {
    const newblog_fileModel = new blog_fileModel({
        blog_id: blog_id,
        blog_file_name: file_name
    })
    return await blog_fileModel.create(newblog_fileModel);
}

const update = async (file_name, blog_id) => {
    const updateblog_fileModel = new blog_fileModel({
        blog_id: blog_id,
        blog_file_name: file_name
    })
    return await blog_fileModel.update(updateblog_fileModel);
}
module.exports = {
    create,
    update
}