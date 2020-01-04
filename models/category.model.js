const mongoose = require("mongoose");

const category = mongoose.model("category",new mongoose.Schema({
    category_name:{type:String},
},{
    timestamps:true
}))
 
const subcategory = mongoose.model("subcategory",new mongoose.Schema({
    category_name:{type:String},
    subcategory_name:{type:String }
},{
    timestamps:true
}))
 
module.exports = {
    category,
    subcategory
 }