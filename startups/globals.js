const path = require("path");
const { logger } = require("../helpers/Utilities/logger");


module.exports =()=>{
//Declear global variables
 
if (!global.MESSAGE)
    global.MESSAGE = require('../constants/messages.js');

if (!global.STATUS_CODE)
    global.STATUS_CODE = require('../constants/statusCode.js');

if (!global.SEND_RESPONSE)
    global.SEND_RESPONSE = require('../helpers/webResponse');
    

    if(process.env.NODE_ENV==="dev"){
        global.logger = logger;    
    }
    
    global.logger = console;
}