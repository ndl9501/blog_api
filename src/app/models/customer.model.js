const db = require("../utils/database");
const md5 = require('md5');
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");



// constructor
const Customer = function (customer) {
    this.customer_name = customer.customer_name,
        this.customer_phonenumber = customer.customer_phonenumber,
        this.customer_email = customer.customer_email,
        this.password = customer.password,
        this.customer_addr = customer.customer_addr,
        this.customer_avatar = customer.customer_avatar,
        this.customer_gender = customer.customer_gender,
        this.deleted = customer.deleted || 0,
        this.pre_id = customer.pre_id || 0
};

Customer.create = async (newCustomer) => {
    newCustomer.password = md5(newCustomer.password);
    return new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
            if (err) {
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            }
            const query = "INSERT INTO customer SET ?";
            db.query(query, newCustomer, (err, rs) => {
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
};

Customer.findAll = async () => {
    return new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
            if (err) {
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            }
            const query = `SELECT *
        FROM blog_api.customer 
        cross join premision
        on customer.pre_id = premision.premision_id`;
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
};

Customer.findById = async (id) => {
    return new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
            if (err) {
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            }
            const query = `SELECT *
        FROM blog_api.customer 
        cross join premision
        on customer.pre_id = premision.premision_id
        WHERE customer_id = ?`;
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

Customer.delete = async (id) => {
    return new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
            if (err) {
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            }
            const query = "UPDATE blog_api.customer SET deleted = 1 WHERE customer_id = ?";
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

Customer.update = async (updateCustomer, id) => {
    // if(updateCustomer.keys.length)
    return new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
            if (err) {
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            }
            const query = "UPDATE blog_api.customer SET ? WHERE customer_id = ?";
            db.query(query, [{ ...updateCustomer }, id], (err, rs) => {
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

module.exports = Customer;