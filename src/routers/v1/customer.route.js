const express = require('express');
const router = express.Router();
const customerController = require("../../app/controllers/customer.controller")
router.route("/")
    .get(customerController.getAllCustomer)
    .post(customerController.createCustomer)

router.route('/:id')
    .get(customerController.getCustomerByID)
    .put(customerController.updateCustomer)
    .delete(customerController.deleteCustomer)

router.route("/all")
    .get(customerController.getAllCustomerWithAdmin)


module.exports = router