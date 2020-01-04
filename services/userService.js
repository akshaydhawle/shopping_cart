const { bcrypt, jwt, config } = require('../helpers/lib');

const generateJWT = (data,expiretime)=>{
    let token =  jwt.sign({
        data: data
      }, config.get("secretKey"), expiretime);

      return token;
}

const hashPassword = async ( password, rounds )=>{
    let salt = await bcrypt.genSalt(rounds);
    let hash = await bcrypt.hash(password, salt);
    return hash;
}


const compareHash = async(oldpassword, newpassword)=>{
  
    let validate = await bcrypt.compare(oldpassword, newpassword);

  return validate;
}

module.exports = {
    generateJWT,
    hashPassword,
    compareHash
}
