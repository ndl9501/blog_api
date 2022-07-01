const db = require("../utils/database");
const slug = require("slug");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");

const Blog_file = function (blog_file) {
    this.blog_file_name = blog_file.blog_file_name,
        this.blog_id = blog_file.blog_id
}

Blog_file.create = async (newBlog_file) => {
    // console.log(newTag);
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO blog_file SET ?`;
        db.query(query, newBlog_file, (err, rs) => {
            if (err) {
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message))
            }
            else {
                resolve({ id: rs.insertId });
            }
        })
    })
}

Blog_file.findAll = async () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM blog_api.blog_file;";
        db.query(query, (err, rs) => {
            if (err) {
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message))
            } else {
                resolve(rs)
            }
        })
    })
}

Blog_file.findByBlogId = async (blog_id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM blog_api.blog_file WHERE blog_id = ?";
        db.query(query, blog_id, (err, rs) => {
            if (err) {
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            } else {
                resolve(rs)
            }
        })
    })
}

Blog_file.delete = async (blog_id)=>{
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM `blog_api`.`blog_file` WHERE `blog_file_id` = ?";
        db.query(query, blog_id, (err, rs) => {
            if (err) {
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            } else {
                resolve(rs)
            }
        })
    })
}


module.exports = Blog_file;