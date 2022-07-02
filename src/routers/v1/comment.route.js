const express = require("express");
const router = express.Router();
const commentController = require("../../app/controllers/comment.controller");
const commentValidation = require("../../app/validations/comment.validation");
const validateMiddleware = require("../../app/middlewares/validate.middleware");

const authMiddleware = require("../../app/middlewares/auth.middleware");

router.route("/")
    .get(commentController.findAll)
    .post(authMiddleware.isAuth, validateMiddleware(commentValidation.create), commentController.create)

router.route("/:id")
    .get(commentController.findById)
    .put(authMiddleware.isAdmin, validateMiddleware(commentValidation.update), commentController.update)
    .delete(authMiddleware.isAdmin, commentController.remove)


module.exports = router;