const express = require("express");
const router = express.Router();
const categoryController = require("../../app/controllers/category.controller");
const validateMiddleware = require("../../app/middlewares/validate.middleware");
const categoryValidation = require('../../app/validations/category.validation');

router.route("/")
    .get(categoryController.findAll)
    .post(validateMiddleware(categoryValidation.create), categoryController.create)

router.route("/:id")
    .get(categoryController.findById)
    .put(validateMiddleware(categoryValidation.update), categoryController.update)
    .delete(categoryController.remove)


module.exports = router;