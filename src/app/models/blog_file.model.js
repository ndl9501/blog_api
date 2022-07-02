const db = require("../utils/database");
const slug = require("slug");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");

const blog_file = function (blog_file) {
    this.blog_file_name = blog_file.blog_file_name,
        this.blog_id = blog_file.blog_id
}

blog_file.create = async (newblog_file) => {
    // console.log(newTag);
    return new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
            if (err) {
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            }
            const query = `INSERT INTO blog_file SET ?`;
            db.query(query, newblog_file, (err, rs) => {
                if (err) {
                    db.rollback((err) => {
                        console.error(err);
                    });
                    reject(new ApiError(httpStatus.BAD_REQUEST, err.message))
                }
                else {
                    resolve({ id: rs.insertId });
                }
            })
        })
    })
}

blog_file.update = async (updateblog_file, id) => {
    return new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
            if (err) {
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            }
            const query = "UPDATE blog_api.blog_file SET ? WHERE blog_file_id = ?";
            db.query(query, [{ ...updateblog_file }, id], (err, rs) => {
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
    })
}

blog_file.findAll = async () => {
    return new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
            if (err) {
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            }
            const query = "SELECT * FROM blog_api.blog_file;";
            db.query(query, (err, rs) => {
                if (err) {
                    db.rollback((err) => {
                        console.error(err);
                    });
                    reject(new ApiError(httpStatus.BAD_REQUEST, err.message))
                } else {
                    resolve(rs)
                }
            })
        })
    })
}

blog_file.findByBlogId = async (blog_id) => {
    return new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
            if (err) {
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            }
            const query = "SELECT * FROM blog_api.blog_file WHERE blog_id = ?";
            db.query(query, blog_id, (err, rs) => {
                if (err) {
                    db.rollback((err) => {
                        console.error(err);
                    });
                    reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
                } else {
                    resolve(rs)
                }
            })
        })
    })
}

blog_file.delete = async (blog_id) => {
    return new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
            if (err) {
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            }
            const query = "DELETE FROM `blog_api`.`blog_file` WHERE `blog_file_id` = ?";
            db.query(query, blog_id, (err, rs) => {
                if (err) {
                    db.rollback((err) => {
                        console.error(err);
                    });
                    reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
                } else {
                    resolve(rs)
                }
            })
        })
    })
}


module.exports = blog_file;