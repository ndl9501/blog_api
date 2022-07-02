const express = require('express');
const router = express.Router();
const customerController = require("../../app/controllers/customer.controller")
const customerValidation = require("../../app/validations/customer.validation");
const Validation = require("../../app/middlewares/validate.middleware");
const authMiddleware = require("../../app/middlewares/auth.middleware");


router.route("/")
    .get(authMiddleware.isAdmin,customerController.findAll)
    .post(Validation(customerValidation.create), customerController.create)

router.route('/:id')
    .get(customerController.findById)
    .put(authMiddleware.isAdmin, Validation(customerValidation.update), customerController.update)
    .delete(authMiddleware.isAdmin, customerController.remove)



module.exports = router