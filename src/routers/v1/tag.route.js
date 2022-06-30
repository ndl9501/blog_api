const express = require("express");
const router = express.Router();
const tagController = require("../../app/controllers/tag.controller");
const uploadMiddleware = require("../../app/middlewares/upload.middleware");
const validateMiddleware = require("../../app/middlewares/validate.middleware");
const tagValidation = require('../../app/validations/tag.validation');

router.route("/")
    .get(tagController.findAll)
    .post(validateMiddleware(tagValidation.create), tagController.create)
router.post("/post", uploadMiddleware.single("avatar"), (req, res) => {
    console.log(req.file);
    return res.json({
        "req": req.body
    })
})
router.route("/:id")
    .get(tagController.findById)
    .put(validateMiddleware(tagValidation.update), tagController.update)
    .delete(tagController.remove)


module.exports = router;