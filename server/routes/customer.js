const express = require('express');
const router = express.Router();
const customer = require("../controller/controller")

router.get('/', customer.homepage);

module.exports = router;