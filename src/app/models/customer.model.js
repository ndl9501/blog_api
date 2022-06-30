const db = require("../utils/database");
const bcrypt = require('bcrypt');



// constructor
const Customer = function (customer) {
    this.customer_phonenumber = customer.customer_phonenumber,
        this.customer_email = customer.customer_email,
        this.password = customer.password,
        this.customer_addr = customer.customer_addr,
        this.customer_avatar = customer.customer_avatar,
        this.customer_gender = customer.customer_gender,
        this.is_deleted = customer.is_deleted || 0,
        this.createdAt = customer.createdAt,
        this.updatedAt = customer.updatedAt
};

Customer.create = async (newCustomer, result) => {
    const salt = await bcrypt.genSalt(8);
    newCustomer.password = await bcrypt.hash(newCustomer.password, salt);
    db.query("INSERT INTO customer SET ?", newCustomer, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Customer: ", { id: res.insertId, ...newCustomer });
        result(null, { id: res.insertId, ...newCustomer });
    });
};

Customer.findAll = async (result) => {
    db.query("SELECT * FROM customer WHERE is_deleted=0", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("customer: ", { res });
        result(null, res);
    });
};

Customer.findAllWithAdmin = result => {
    db.query("SELECT * FROM customer ", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Customer: ", res);
        result(null, res);
    });
};

Customer.updateById = (id, customer, result) => {
    db.query(
        `UPDATE customer SET customer_phonenumber = ?
        customer_email = ?
        customer_addr = ?
        customer_avatar = ?
        customer_gender = ?
        updatedAt = ? 
        WHERE id = ?`,
        [
            customer.customer_phonenumber,
            customer.customer_email,
            customer.customer_addr,
            customer.customer_avatar,
            customer.customer_gender,
            new Date(),
            id
        ],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated Customer: ", { id: id, ...Customer });
            result(null, { id: id, ...Customer });
        }
    );
};

Customer.remove = (id, result) => {
    db.query(`UPDATE customer SET is_deleted = 1 WHERE customer_id = ?`, [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ message: "not found id by customer" }, null);
            return;
        }

        console.log("deleted Customer with id: ", id);
        result(null, res);
    });
};

module.exports = Customer;