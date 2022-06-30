const router = require('express').Router();

const v1 = require('./v1')

router.use("/v1", v1);
// router.use("/v2", v2);

module.exports = router;