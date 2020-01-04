const express = require("express");

const router = express.Router();

let cartController = require("../controllers/cart.controller");

router.post('/addToCart',cartController.addToCart );
router.put('/updateCart',cartController.updateCart );

module.exports = router;