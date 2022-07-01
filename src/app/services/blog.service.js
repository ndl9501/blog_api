
const httpStatus = require("http-status");
const blogModel = require("../models/blog.model");
const Blog_file = require("../models/blog_file.model");
const Blog_tag = require("../models/blog_tag.model");
const commentModel = require("../models/comment.model");
const ApiError = require("../utils/apiError");

const findAll = async () => {
    return blogModel.findAll()
        .then(rs => rs)
        .then(async rs => {
            for (const element of rs) {
                element.files = [];
                if (element?.blog_id) {
                    const files = await Blog_file.findByBlogId(element.blog_id)
                    element.files = files;
                }
            }
            return rs
        })
        .then(async rs => {
            for (const element of rs) {
                element.tags = [];
                if (element?.blog_id) {
                    const tags = await Blog_tag.findByBlogId(element.blog_id)
                    element.tags = tags;
                }
            }
            return rs
        })
        .then(async rs => {
            for (const element of rs) {
                element.comments = [];
                if (element?.blog_id) {
                    const comments = await commentModel.findByBlogId(element.blog_id)
                    element.comments = comments;
                }
            }
            return rs
        });

}

const findById = async (id) => {
    return blogModel.findById(id)
        .then(rs => rs)
        .then(async rs => {
            for (const element of rs) {
                element.files = [];
                if (element?.blog_id) {
                    const files = await Blog_file.findByBlogId(element.blog_id)
                    element.files = files;
                }
            }
            return rs
        })
        .then(async rs => {
            for (const element of rs) {
                element.tags = [];
                if (element?.blog_id) {
                    const tags = await Blog_tag.findByBlogId(element.blog_id)
                    element.tags = tags;
                }
            }
            return rs
        });
}

const create = async (body, customer_id) => {
    // console.log(body);
    const newBlog = new blogModel({
        blog_title: body.title,
        blog_context: body.context,
        category_id: body.category_id
    })

    return await blogModel.create(newBlog, customer_id);

}

const remove = async (id) => {
    return await blogModel.delete(id);
}

const update = async (body, blog_id)=>{
    if(!blog_id){
        throw new ApiError(httpStatus.BAD_REQUEST, "id is not null")
    }
    const updateBlog = new blogModel({
        blog_title: body.title,
        blog_context: body.context,
        category_id: body.category_id
    })
    console.log(updateBlog);
    return await blogModel.update(updateBlog, blog_id);
}

module.exports = {
    findAll,
    findById,
    create,
    remove,
    update
}