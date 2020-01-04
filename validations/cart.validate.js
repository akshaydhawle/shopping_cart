const Joi = require("joi");

Joi.objectId = require('joi-objectid')(Joi)

const schema ={
    user: Joi.objectId(),
    product:Joi.objectId(),
    quantity: Joi.number().min(1).required(),
    price: Joi.number().min(1).required(),
    total: Joi.number().min(0).required()
}

function validateAddCart(cart){
  return Joi.validate(cart,schema);
}

function validateUpdateCart(cart){
    return Joi.validate(cart,schema);
}
 

function validateSingle(cart){
    let schema={
        id: Joi.objectId(),
    }
    return Joi.validate(cart,schema);
}


function validateUser(){
    let schema={
        user: Joi.objectId(),
    }
    return Joi.validate(cart,schema);
}


module.exports = {
  validateAddCart,
  validateUpdateCart,
   validateUser,
   validateSingle 
}


