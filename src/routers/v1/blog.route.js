const express = require('express');
const router = express.Router();
const blogController = require("../../app/controllers/blog.controller");
const blogValidation = require("../../app/validations/blog.validation");
const validateMiddleware = require("../../app/middlewares/validate.middleware");
const authMiddleware = require("../../app/middlewares/auth.middleware");
const uploadMiddleware = require("../../app/middlewares/upload.middleware");


router.route("/")
    .get(blogController.findAll)
    .post(authMiddleware.isAuth, uploadMiddleware.array('img', 3), blogController.create)



router.route("/:id")
    .get(blogController.findById)
    .put(validateMiddleware(blogValidation.update) , blogController.update)
    .delete(authMiddleware.isAdmin, blogController.remove)



module.exports = router;