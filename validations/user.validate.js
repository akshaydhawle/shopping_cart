const Joi = require("joi");


function validateRegistration(user) {
    const schema = {
      firstname: Joi.string().max(50).required(),
      lastname: Joi.string().max(50).required(),
      gender: Joi.string().required(),
      email: Joi.string().max(50).required(),
      password: Joi.string().max(50).required(),
      city: Joi.string().max(50).required(),
      country: Joi.string().max(50),
    };
  
    return Joi.validate(user, schema);
  }

  function validateLoginUser(user){
      const schema={
        email: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(50).required(),
      }
        return Joi.validate(user,schema);
    }

  module.exports = {
            validateRegistration,
            validateLoginUser
  }