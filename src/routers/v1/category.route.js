const express = require("express");
const router = express.Router();
const categoryController = require("../../app/controllers/category.controller");
const categoryValidation = require("../../app/validations/category.validation");
const validateMiddleware = require("../../app/middlewares/validate.middleware");


const authMiddleware = require("../../app/middlewares/auth.middleware");

router.route("/")
    .get(categoryController.findAll)
    .post(authMiddleware.isAdmin, validateMiddleware(categoryValidation.create), categoryController.create)

router.route("/:id")
    .get(categoryController.findById)
    .put(authMiddleware.isAdmin, validateMiddleware(categoryValidation.update), categoryController.update)
    .delete(authMiddleware.isAdmin, categoryController.remove)


module.exports = router;