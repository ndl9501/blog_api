const db = require("../utils/database");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");

const Comment = function (comment) {
    this.comment_context = comment.comment_context
}

Comment.create = async (newComment) => {
    let data = []
    console.log(newComment);
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO comment SET ?";
        db.query(query, newComment, (err, rs) => {
            if (err) {
                reject(new ApiError(400, err.message))
            }
            else {
                resolve({ id: rs.insertId });
            }
        })
    });
}

Comment.findAll = async () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM blog_api.comment;";
        db.query(query, (err, rs) => {
            if (err) {
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message))
            } else {
                resolve(rs)
            }
        })
    })
}

Comment.findById = async (id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM blog_api.comment WHERE comment_id = ?";
        db.query(query, id, (err, rs) => {
            if (err) {
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            } else {
                resolve(rs)
            }
        })
    })
}

Comment.findByBlogId = async (id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM blog_api.comment WHERE blog_id = ?";
        db.query(query, id, (err, rs) => {
            if (err) {
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            } else {
                resolve(rs)
            }
        })
    })
}

Comment.delete = async (id) => {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM blog_api.comment WHERE comment_id = ?";
        db.query(query, id, (err, rs) => {
            if (err) {
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            } else {
                resolve(rs)
            }
        })
    })
}

Comment.update = async (updatecomment, id) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE blog_api.comment SET ? WHERE comment_id = ?";
        db.query(query, [{...updatecomment }, id], (err, rs) => {
            if (err) {
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

module.exports = Comment;