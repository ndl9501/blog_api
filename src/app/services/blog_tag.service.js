const Blog_tagModel = require("../models/blog_tag.model");



const create = async (blog_id, tag_id) => {
    const newBlog_tag = new Blog_tagModel({
        blog_id,
        tag_id
    })
    return await Blog_tagModel.create(newBlog_tag);
}

module.exports = {
    create
};