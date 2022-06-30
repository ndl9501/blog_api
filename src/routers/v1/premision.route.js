const express = require("express");
const router = express.Router();
const validateMiddleware = require("../../app/middlewares/validate.middleware");
const premisionValidation = require('../../app/validations/premision.validation');
const premisionController = require('../../app/controllers/premision.controller');

router.route("/")
    .get(premisionController.findAll)
    .post(validateMiddleware(premisionValidation.create), premisionController.create)

router.route("/:id")
    .get(premisionController.findById)
    .put(validateMiddleware(premisionValidation.update), premisionController.update)
    .delete(premisionController.remove)


module.exports = router;