const db = require("../utils/database");
const slug = require('slug');
const ApiError = require('../utils/ApiError');
const httpStatus = require("http-status");

const Premision = function (premision) {
    this.premision_name = premision.premision_name,
        this.premision_slug = slug(premision.premision_name, "_"),
        this.premision_description = premision.premision_description
}

Premision.create = async (newPremision) => {
    console.log(newPremision);
    return new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
            if (err) {
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            }
            const query = "INSERT INTO blog_api.premision SET ?";
            db.query(query, newPremision, (err, rs) => {
                if (err) {
                    db.rollback((err) => {
                        console.error(err);
                    });
                    console.error(err);
                    reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
                } else {
                    resolve({ id: rs.insertId });
                }
            })
        })
    })
}

Premision.findAll = async () => {
    return new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
            if (err) {
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            }
            const query = "SELECT * FROM blog_api.premision;";
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

Premision.findById = async (id) => {
    return new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
            if (err) {
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            }
            const query = "SELECT * FROM blog_api.premision WHERE premision_id = ?";
            db.query(query, id, (err, rs) => {
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


Premision.delete = async (id) => {
    return new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
            if (err) {
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            }
            const query = "DELETE FROM `blog_api`.`premision` WHERE premision_id = ?";
            db.query(query, id, (err, rs) => {
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

Premision.update = async (updatePremision, id) => {
    return new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
            if (err) {
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            }
            const query = "UPDATE blog_api.premision SET ? WHERE premision_id = ?";
            db.query(query, [{ ...updatePremision }, id], (err, rs) => {
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

module.exports = Premision;