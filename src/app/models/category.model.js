const db = require("../utils/database");
const slug = require("slug");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");

const Category = function (category) {
    this.category_title = category.category_title,
        this.slug = slug(category.category_title, '_'),
        this.category_description = category.category_description,
        this.parent_id = category.parent_id || 0
}

Category.create = async (newCategory) => {
    let data = []
    // console.log(newCategory);
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO category SET ?";
        db.query(query, newCategory, (err, rs) => {
            if (err) {
                console.error(err);
                reject(new ApiError(400, err.message))
            }
            else {
                resolve({ id: rs.insertId });
            }
        })
    });
}


Category.findAll = async () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM blog_api.category;`;
        db.query(query, (err, rs) => {
            if (err) {
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message))
            }
            else {
                resolve(rs);
            }
        })
    })
}


Category.findById = async (id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM blog_api.category WHERE category_id = ?";
        db.query(query, id, (err, rs) => {
            if (err) {
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            } else {
                resolve(rs)
            }
        })
    })
}

Category.delete = async (id) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE blog_api.category SET published = 0 WHERE category_id = ?";
        db.query(query, id, (err, rs) => {
            if (err) {
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            } else {
                resolve(rs)
            }
        })
    })
}

Category.update = async (updateCategory, id) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE blog_api.category SET ? WHERE category_id = ?";
        db.query(query, [{ ...updateCategory }, id], (err, rs) => {
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
module.exports = Category;