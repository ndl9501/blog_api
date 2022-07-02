const db = require("../utils/database");
const slug = require("slug");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");

const Blog = function (blog) {
    this.blog_title = blog.blog_title,
        this.blog_slug = slug(blog.blog_title || ""),
        this.category_id = blog.category_id,
        this.blog_context = blog.blog_context
}

Blog.create = async (newBlog, customer_id) => {
    return new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
            if (err) {
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            }
            const query = "INSERT INTO blog SET ?";
            db.query(query, [{ ...newBlog, customer_id }], (err, rs) => {
                if (err) {
                    db.rollback((err) => {
                        console.error(err);
                    });
                    console.error(err);
                    reject(new ApiError(400, err.message))
                }
                else {
                    resolve({ id: rs.insertId });
                }
            })
        })
    });
}


Blog.findAll = async () => {
    return new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
            if (err) {
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            }
            const query = `SELECT * FROM blog_api.blog left join blog_tag on blog_tag.blog_id = blog.blog_id`;
            db.query(query, (err, rs) => {
                if (err) {
                    db.rollback((err) => {
                        console.error(err);
                    });
                    console.error(err);
                    reject(new ApiError(httpStatus.BAD_REQUEST, err.message))
                }
                else {
                    resolve(rs);
                }
            })
        })
    })
}


Blog.findById = async (id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM blog_api.blog WHERE blog_id = ?";
        db.query(query, id, (err, rs) => {
            if (err) {
                db.rollback((err) => {
                    console.error(err);
                });
                console.error(err);
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            } else {
                resolve(rs)
            }
        })
    })
}

Blog.delete = async (id) => {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM blog_api.blog WHERE blog_id = ?";
        db.query(query, id, (err, rs) => {
            if (err) {
                db.rollback((err) => {
                    console.error(err);
                });
                console.error(err);
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            } else {
                resolve(rs)
            }
        })
    })
}

Blog.update = async (updateBlog, id) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE blog_api.blog SET ? WHERE blog_id = ?";
        db.query(query, [{ ...updateBlog }, id], (err, rs) => {
            if (err) {
                db.rollback((err) => {
                    console.error(err);
                });
                console.error(err);
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            } else {
                if (rs.affectedRows == 0) {
                    resolve({ "err": "Not Found" })
                }
                resolve({ "affectedRows": rs.affectedRows })
            }
        })
    })
}
module.exports = Blog;