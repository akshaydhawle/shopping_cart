const Joi = require("joi");

function addCategoryValidate(category){
    let schema ={
        category_name: Joi.string().max(50).required(),
    }
    return Joi.validate(category, schema);
}

function updateCategoryValidate(category){
    let schema ={
        id: Joi.string().required(),
        category_name: Joi.string().max(50).required(),
    }
    return Joi.validate(category, schema);
}

function deleteCategoryValidate(category){
    let schema ={
        id: Joi.string().required(),
    }
    return Joi.validate(category, schema);
}


function addSubCategoryValidate(category){
    let schema ={
        category_name: Joi.string().max(50).required(),
        subcategory_name: Joi.string().max(50).required(),
    }
    return Joi.validate(category, schema);
}

function updateSubCategoryValidate(category){
    let schema ={
        id: Joi.string().required(),
        category_name: Joi.string().max(50).required(),
        subcategory_name: Joi.string().max(50),
    }
    return Joi.validate(category, schema);
}

function deleteSubCategoryValidate(category){
    let schema ={
        id: Joi.string().required(),
        category_name: Joi.string().max(50).required(),
    }
    return Joi.validate(category, schema);
}

module.exports ={
        addCategoryValidate,
        updateCategoryValidate,
        deleteCategoryValidate,
        addSubCategoryValidate,
        updateSubCategoryValidate,
        deleteSubCategoryValidate
}