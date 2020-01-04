const { userModel  } = require("../models/index");

const { validateRegistration, validateLoginUser } = require("../validations/user.validate");

const { generateJWT, hashPassword, compareHash } = require("../services/userService");


exports.registerUser = async ( req,res ) => {
try {

        let { password } = req.body;    
        //validations
        let { error } = validateRegistration(req.body);
        
        if (error) return SEND_RESPONSE(res,[],error.details[0].message,STATUS_CODE.BAD_REQUEST)

        //generate salt 
         let hash = await hashPassword(password , 10); 
         
         req.body.password = hash;
  
        //save data into database
        let userdata =  await userModel(req.body).save();
        //delete password
        delete userdata[password];
        
        //generate jwt token ...
        token = generateJWT( userdata , { expiresIn: 60 * 60 });

        return SEND_RESPONSE(res,token,MESSAGE.USER_REGISTER,STATUS_CODE.CREATED);

} catch (error) {
    SEND_RESPONSE(res,[],error,STATUS_CODE.INTERNAL_SERVER_ERROR);
}
}


exports.loginUser= async( req,res )=>{
    try {
    
        //extract data
          let { email , password } = req.body;        

          //validations
          let { error } = validateLoginUser(req.body);
        
          if (error) return SEND_RESPONSE(res,[],error.details[0].message,STATUS_CODE.BAD_REQUEST)
  
         //check user exists or not.
          let user = await userModel.findOne({email:email});
          
          if( !user ) return SEND_RESPONSE(res,[],MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);

          //compare passwords 
        let validate = await compareHash(password, user.password );  

          if(!validate) return SEND_RESPONSE(res,[],"Either email or password not correct.",STATUS_CODE.BAD_REQUEST);

          //generate jwt
           token = generateJWT( user , { expiresIn: 60 * 60 });
           
           return SEND_RESPONSE(res,token,MESSAGE.USER_REGISTER,STATUS_CODE.CREATED);
        
    } catch (error) {
        SEND_RESPONSE(res,[],MESSAGE.INTERNAL_SERVER_ERROR,STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}


