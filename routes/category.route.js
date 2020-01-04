const express = require("express");

const router = express.Router();

let categoryController = require("../controllers/category.controller");

router.post('/addCategory',categoryController.addCategory);
router.put('/updateCategory',categoryController.updateCategory);
router.delete('/deleteCategory',categoryController.deleteCategory);
router.post('/addSubCategory',categoryController.addSubCategory);
router.put('/updateSubCategory',categoryController.updateSubCategory);
router.delete('/deleteSubCategory',categoryController.deleteSubCategory);
router.get('/findAllCategory',categoryController.findAllCategory);
router.get('/findAllSubCategory',categoryController.findAllSubCategory);



module.exports = router;