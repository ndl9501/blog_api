const express = require('express');
const router = express.Router();
const authController = require("../../app/controllers/auth.controller")
router.route("/login")
    // .get(authController.getAllauth)
    .post(authController.login)



module.exports = router