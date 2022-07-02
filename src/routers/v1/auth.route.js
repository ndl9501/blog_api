const express = require('express');
const router = express.Router();
const authController = require("../../app/controllers/auth.controller");
const authValidation = require("../../app/validations/auth.validation");
const validateMiddleware = require("../../app/middlewares/validate.middleware");


router.route("/login")
    // .get(authController.getAllauth)
    .post(validateMiddleware(authValidation.login) , authController.login)

router.route("/register")
    .post(validateMiddleware(authValidation.register) ,authController.register)



module.exports = router