const express = require("express");

const router = express.Router();

let productController = require("../controllers/products.controller");
let  upload = require('../helpers/utilities/fileUpload');

router.post('/addProduct', upload.fields([  
    { name: 'productimage', maxCount: 1 }, { name: 'photos', maxCount: 5 }
  ]) ,productController.addProduct );

router.get('/getProducts' ,productController.getProducts );
router.get('/searchBy/:search',productController.searchBy);
router.get('/get',productController.getProduct);

module.exports = router;