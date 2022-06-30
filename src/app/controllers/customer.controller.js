const catchAsync = require("../utils/catchAsync");
const customerModel = require("../models/customer.model");

const getAllCustomer = catchAsync((req, res, next) => {
    // throw new Error("hehe");
    customerModel.findAll((err, rs) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error ."
            }); 
        }
        else res.status(200).json({
            "status": 200,
            "msg": "success",
            "customers": rs
        })
    })

})
const getAllCustomerWithAdmin = catchAsync((req, res, next) => {
    // throw new Error("hehe");
    console.log("getAllCustomerWithAdmin");
    customerModel.findAllWithAdmin((err, rs) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error ."
            });
        }
        else res.status(200).json({
            "status": 200,
            "msg": "success",
            "customer": rs
        })
    })

})


const getCustomerByID = catchAsync((req, res, next) => {
    // throw new Error("hehe");
    customerModel.findAll((err, rs) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error ."
            });
        }
        else res.status(200).json({
            "status": 200,
            "msg": "success",
            "customer": rs
        })
    })

})
const createCustomer = catchAsync((req, res, next) => {
    if (!req.body) {
        res.status(400).json({
            message: "Content can not be empty!"
        });
    }
    console.log(req.body);
    const newCustomer = new customerModel({
        customer_phonenumber: req.body.customer_phonenumber,
        customer_email: req.body.customer_email,
        password: req.body.password,
        customer_addr: req.body.customer_addr,
        customer_avatar: req.body.customer_avatar,
        customer_gender: req.body.customer_gender,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    console.log(req.body);
    customerModel.create(newCustomer, (err, data) => {
        if (err) {
            res.status(500).json({
                message:
                    err.message || "Some error occurred while creating the Customer."
            });
        }
        else res.status(201).json({
            "status": 201,
            "msg": "success",
            "customer": data,
        });
    });
})

const updateCustomer = catchAsync((req, res, next) => {
    if (!req.body) {
        return res.status(400).json({
            message: "Content can not be empty!"
        });
    }
    if (!req.params.id) {
        return res.status(400).json({
            message: "Id can not be empty!"
        });
    }
    const updateCustomer = new customerModel({
        customer_phonenumber: req.body.customer_phonenumber,
        customer_email: req.body.customer_email,
        customer_addr: req.body.customer_addr,
        customer_avatar: req.body.customer_avatar,
        customer_gender: req.body.customer_gender,
    });
    console.log(req.body);
    customerModel.updateById(req.params.id, updateCustomer, (err, data) => {
        if (err) {
            res.status(500).json({
                message:
                    err.message || "Some error occurred while creating the Customer."
            });
        }
        else {
            return res.status(201).json({
                "status": 201,
                "msg": "success",
                "customer": data,
            });
        }
    });
})
const deleteCustomer = catchAsync((req, res, next) => {
    if (!req.params.id) {
        return res.status(400).json({
            message: "Id can not be empty!"
        });
    }
    customerModel.remove(req.params.id, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                message: err.message || "Some error occurred while creating the Customer."
            });
        } else {
            return res.status(200).json({
                "status": 200,
                "msg": "success"
            });
        }
    })
})
module.exports = {
    getAllCustomer,
    createCustomer,
    updateCustomer,
    getAllCustomerWithAdmin,
    getCustomerByID,
    deleteCustomer
}