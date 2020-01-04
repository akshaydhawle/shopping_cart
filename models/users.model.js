const mongoose = require("mongoose");

const users = mongoose.model("users",new mongoose.Schema({
    firstname:{type:String},
    lastname:{type:String},
    email:{type:String},
    password:{type:String},
    gender:{type:String},
    city:{type:String},
    country:{type:String},
},{
    timestamps:true
}))
 

module.exports = {
    users
 }