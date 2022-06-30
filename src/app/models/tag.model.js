const db = require("../utils/database");
const slug = require("slug");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");

const Tag = function (tag) {
    this.tag_name = tag.tag_name,
        this.slug = slug(tag.tag_name, '_'),
        this.tag_description = tag.tag_description
}

Tag.create = async (newTag) => {
    let data = []
    console.log(newTag);
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO tag SET ?";
        db.query(query, newTag, (err, rs) => {
            if (err) {
                reject(new ApiError(400, err.message))
            }
            else {
                resolve({ id: rs.insertId });
            }
        })
    });
}

Tag.findAll = async () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM blog_api.tag;";
        db.query(query, (err, rs) => {
            if (err) {
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message))
            } else {
                resolve(rs)
            }
        })
    })
}

Tag.findById = async (id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM blog_api.tag WHERE tag_id = ?";
        db.query(query, id, (err, rs) => {
            if (err) {
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            } else {
                resolve(rs)
            }
        })
    })
}

Tag.delete = async (id) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE blog_api.tag SET published = 0 WHERE tag_id = ?";
        db.query(query, id, (err, rs) => {
            if (err) {
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            } else {
                resolve(rs)
            }
        })
    })
}

Tag.update = async (updateTag, id) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE blog_api.tag SET ? WHERE tag_id = ?";
        db.query(query, [{...updateTag }, id], (err, rs) => {
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
module.exports = Tag;