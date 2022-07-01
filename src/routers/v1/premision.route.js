const express = require("express");
const router = express.Router();
const validateMiddleware = require("../../app/middlewares/validate.middleware");
const authMiddleware = require("../../app/middlewares/auth.middleware");
const premisionValidation = require('../../app/validations/premision.validation');
const premisionController = require('../../app/controllers/premision.controller');

router.route("/")
    .get(authMiddleware.isAdmin,premisionController.findAll)
    .post(authMiddleware.isAdmin,validateMiddleware(premisionValidation.create), premisionController.create)

router.route("/:id")
    .get(authMiddleware.isAdmin,premisionController.findById)
    .put(authMiddleware.isAdmin,validateMiddleware(premisionValidation.update), premisionController.update)
    .delete(authMiddleware.isAdmin,premisionController.remove)


module.exports = router;