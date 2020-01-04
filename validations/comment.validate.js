const Joi = require("joi");

Joi.objectId = require('joi-objectid')(Joi);

function  validateAddComment(comment){
 let schema ={
    user: Joi.objectId(),
    product: Joi.objectId(),
    comment:Joi.string().required(),
    rating:Joi.number()  
 }
 return Joi.validate(comment,schema);
}

function validateId(comment){

    let schema = {
        id:Joi.objectId()
    }
    return Joi.validate(comment,schema);
}

module.exports = {
    validateAddComment,
    validateId
}