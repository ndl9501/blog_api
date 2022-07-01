const express = require("express");
const router = express.Router();
const tagController = require("../../app/controllers/tag.controller");
const uploadMiddleware = require("../../app/middlewares/upload.middleware");
const validateMiddleware = require("../../app/middlewares/validate.middleware");
const tagValidation = require('../../app/validations/tag.validation');
const authMiddleware = require("../../app/middlewares/auth.middleware")


router.route("/")
    .get(tagController.findAll)
    .post(authMiddleware.isAdmin,validateMiddleware(tagValidation.create), tagController.create)
router.post("/post", uploadMiddleware.single("avatar"), (req, res) => {
    console.log(req.file);
    return res.json({
        "req": req.body
    })
})
router.route("/:id")
    .get(tagController.findById)
    .put(authMiddleware.isAdmin,validateMiddleware(tagValidation.update), tagController.update)
    .delete(authMiddleware.isAdmin,tagController.remove)


module.exports = router;