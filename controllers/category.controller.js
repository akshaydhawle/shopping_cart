const { categoryModel, subcategoryModel, productsModel } = require("../models/index");

const { ObjectId } = require("mongoose").Types;

const {addCategoryValidate,updateCategoryValidate,
    deleteCategoryValidate,  addSubCategoryValidate, 
    updateSubCategoryValidate, deleteSubCategoryValidate
    } = require("../validations/category.validate")

exports.addCategory = async(req,res) =>{
    try {
     //extract fields 
     const {category_name } = req.body;  
    //validations
    let { error } = addCategoryValidate(req.body);
        
    if (error) return SEND_RESPONSE(res,[],error.details[0].message,STATUS_CODE.BAD_REQUEST)

    //check category already exists or not 
    let category = await categoryModel.findOne({category_name:category_name});

    if(category) return SEND_RESPONSE(res,[],MESSAGE.ALREADY_EXISTS,STATUS_CODE.ALREADY_EXISTS);

    await categoryModel(req.body).save();

    return SEND_RESPONSE(res,[],MESSAGE.CREATE_DATA,STATUS_CODE.CREATED);
    
    } catch (error) {
        SEND_RESPONSE(res,[],MESSAGE.INTERNAL_SERVER_ERROR,STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}


exports.updateCategory = async(req,res) =>{
    try {
     //extract fields 
     const {category_name, id } = req.body;  
    //validations
    let { error } = updateCategoryValidate(req.body);
        
    if (error) return SEND_RESPONSE(res,[],error.details[0].message,STATUS_CODE.BAD_REQUEST)

    //check category already exists or not 
    let category = await categoryModel.findOne({_id:ObjectId(id)});

    if(!category) return SEND_RESPONSE(res,[],MESSAGE.NOT_FOUND,STATUS_CODE.NOT_FOUND);

    await categoryModel.updateOne(
        {_id:ObjectId(id)},
        {$set:{category_name:category_name} },
        {new:true})

    await subcategoryModel.update({category_name:category.category_name},{$set:{
        category_name:category_name
    }})    

    await productsModel.update({category_name:category.category_name},{$set:{
        category_name:category_name
    }})

    return SEND_RESPONSE(res,[],MESSAGE.UPDATE_DATA,STATUS_CODE.CREATED);
    
    } catch (error) {
        SEND_RESPONSE(res,[],MESSAGE.INTERNAL_SERVER_ERROR,STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}



exports.deleteCategory = async(req,res) =>{
    try {
     //extract fields 
     const { id } = req.body;  
    //validations
    let { error } = deleteCategoryValidate(req.body);
        
    if (error) return SEND_RESPONSE(res,[],error.details[0].message,STATUS_CODE.BAD_REQUEST)

    //check category already exists or not 
    let category = await categoryModel.findOne({_id:ObjectId(id)});

    if(!category) return SEND_RESPONSE(res,[],MESSAGE.NOT_FOUND,STATUS_CODE.NOT_FOUND);

    await categoryModel.deleteOne({_id:ObjectId(id)});

    await subcategoryModel.remove({category_name:{$eq:category.category_name}});

    await productsModel.remove({category_name:{$eq:category.category_name}});

    return SEND_RESPONSE(res,[],"deleted successfully",STATUS_CODE.NO_CONTENT );
    
    } catch (error) {
        SEND_RESPONSE(res,[],MESSAGE.INTERNAL_SERVER_ERROR,STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}



exports.addSubCategory = async(req,res) =>{
    try {
     //extract fields 
     const {category_name , subcategory_name } = req.body;  
    //validations
    let { error } = addSubCategoryValidate(req.body);
        
    if (error) return SEND_RESPONSE(res,[],error.details[0].message,STATUS_CODE.BAD_REQUEST)

    //check category already exists or not 
    let category = await subcategoryModel.findOne({$and:[{category_name:category_name},{subcategory_name:subcategory_name}]});

    if(category) return SEND_RESPONSE(res,[],MESSAGE.ALREADY_EXISTS,STATUS_CODE.ALREADY_EXISTS);

    await subcategoryModel(req.body).save();

    return SEND_RESPONSE(res,[],MESSAGE.CREATE_DATA,STATUS_CODE.CREATED);
    
    } catch (error) {
        SEND_RESPONSE(res,[],MESSAGE.INTERNAL_SERVER_ERROR,STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}


exports.updateSubCategory = async(req,res) =>{
    try {
     //extract fields 
     const {category_name, subcategory_name, id } = req.body;  
    //validations
    let { error } = updateSubCategoryValidate(req.body);
        
    if (error) return SEND_RESPONSE(res,[],error.details[0].message,STATUS_CODE.BAD_REQUEST)

    //check category already exists or not 
    let subcategory = await subcategoryModel.findOne({_id:ObjectId(id)});

    if(!subcategory) return SEND_RESPONSE(res,[],MESSAGE.NOT_FOUND,STATUS_CODE.NOT_FOUND);

    await categoryModel.updateOne(
        {_id:ObjectId(id)},
        {$set:
            {  
                subcategory_name:subcategory_name
            },
         },
        {new:true})

        await productsModel.update({subcategory_name:subcategory.subcategory_name},{$set:{
            subcategory_name:subcategory_name
        }})

    return SEND_RESPONSE(res,[],MESSAGE.UPDATE_DATA,STATUS_CODE.CREATED);
    
    } catch (error) {
        SEND_RESPONSE(res,[],MESSAGE.INTERNAL_SERVER_ERROR,STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}



exports.deleteSubCategory = async(req,res) =>{
    try {
     //extract fields 
     const { id } = req.body;  
    //validations
    let { error } = deleteSubCategoryValidate(req.body);
        
    if (error) return SEND_RESPONSE(res,[],error.details[0].message,STATUS_CODE.BAD_REQUEST)

    //check category already exists or not 
    let subcategory = await subcategoryModel.findOne({_id:ObjectId(id)});

    if(!subcategory) return SEND_RESPONSE(res,[],MESSAGE.NOT_FOUND,STATUS_CODE.NOT_FOUND);

    await subcategoryModel.deleteOne({_id:ObjectId(id)});

    await  productsModel.remove({subcategory_name:{$eq:subcategory.subcategory_name}});

    return SEND_RESPONSE(res,[],MESSAGE.DELETE_DATA,STATUS_CODE.NO_CONTENT );
    
    } catch (error) {
        SEND_RESPONSE(res,[],MESSAGE.INTERNAL_SERVER_ERROR,STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}

exports.findAllCategory = async( req,res)=>{
    try {
        let category = await categoryModel.find({});

       return SEND_RESPONSE(res,category,MESSAGE.SUCCESS,STATUS_CODE.OK );
       
       } catch (error) {
           SEND_RESPONSE(res,[],MESSAGE.INTERNAL_SERVER_ERROR,STATUS_CODE.INTERNAL_SERVER_ERROR);
       }
}

exports.findAllSubCategory = async( req,res)=>{
    try {
        let subcategory = await subcategoryModel.find({});

       return SEND_RESPONSE(res,subcategory,MESSAGE.SUCCESS,STATUS_CODE.OK );
       
       } catch (error) {
           SEND_RESPONSE(res,[],MESSAGE.INTERNAL_SERVER_ERROR,STATUS_CODE.INTERNAL_SERVER_ERROR);
       }
}
