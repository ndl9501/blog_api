
const blogModel = require("../models/blog.model");
const Blog_file = require("../models/blog_file.model");

const findAll = async () => {
    return blogModel.findAll()
        .then(rs => rs)
        .then(async rs => {
            for (const element of rs) {
                const files = await Blog_file.findByBlogId(element.blog_id)
                element.files = files;
            }
            return rs
        });

}

const findById = async (id) => {
    return blogModel.findById(id)
        .then(rs => rs)
        .then(async rs => {
            console.log(rs);
            for (const element of rs) {
                const files = await Blog_file.findByBlogId(element.blog_id)
                element.files = files;
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

module.exports = {
    findAll,
    findById,
    create,
    remove
}