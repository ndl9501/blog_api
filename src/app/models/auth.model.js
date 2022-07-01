const db = require("../utils/database");
const httpStatus = require("http-status");
const md5 = require('md5');
const ApiError = require("../utils/ApiError");

const Auth = function (auth) {
    this.customer_email = auth.email,
        this.password = auth.password
}

Auth.login = async (auth) => {

    auth.password = md5(auth.password);
    // console.log(auth);
    return new Promise((resolve, reject) => {
        const query = `select * from customer
        where customer_email = ? and password = ?
        limit 1`;
        db.query(query, [auth.customer_email, auth.password], (err, rs) => {
            if (err) {
                console.error(err);
                reject(new ApiError(httpStatus.BAD_REQUEST, "Invalid login credentials"));
            } else {
                if(rs.length){
                    delete rs[0].password
                }
                resolve(rs[0])
            }
        })
    })
}

Auth.register = async (auth) => {

    auth.password = md5(auth.password);

    return new Promise((resolve, reject) => {
        const query = `INSERT INTO customer SET ?`;
        db.query(query, auth, (err, rs) => {
            if (err) {
                console.error(err);
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            } else {
                resolve({ id: rs.insertId })
            }
        })
    })
}

Auth.ROLE = async (id) => {

    return new Promise((resolve, reject) => {
        const query = `SELECT premision_slug FROM blog_api.customer
        cross join premision on pre_id = premision_id
         WHERE customer_id = ?`;
        db.query(query, id, (err, rs) => {
            if (err) {
                console.error(err);
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            } else {
                // console.log(rs[0]);
                resolve(rs[0])
            }
        })
    })
}

module.exports = Auth;