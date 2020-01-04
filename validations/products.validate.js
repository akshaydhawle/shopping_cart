const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi)

function addProductValidate(product){
    let schema ={
    productname:Joi.string().required(),
    // sizes:Joi.array().items(
    //     Joi.object({
    //         size:Joi.string(),
    //         sizeCount:Joi.number()
    //     })
    // ),
    //   colors:Joi.array().items(
    //     Joi.object({
    //         color:Joi.string(),
    //         colorCount:Joi.number()
    //     }))
    //     ,
    brand:Joi.string().required(),
    productimage:Joi.string(),
    photos:Joi.string(),   
    price:Joi.number().required(),
    description :Joi.string(),
    images:Joi.array(),
    count : Joi.number().required(),
    category:Joi.string().required(),
    subcategory:Joi.string().required(),
    }

    return Joi.validate(product, schema);
}

function validateId(product){
    let schema ={
        id:Joi.objectId()
    }
    return Joi.validate(product, schema);
}

module.exports ={
    addProductValidate,
    validateId
}