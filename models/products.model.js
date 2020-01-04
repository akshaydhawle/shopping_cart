const mongoose = require("mongoose");

const products = mongoose.model("products",new mongoose.Schema({
    productname:{type:String }, 
    productimage:{type:String }, 
    brand:{ type:String},
    price:{ type:Number },
    description :{type:String},
    images:[ String ],
    imagesdata:[],
    count : { type:Number },
    category:{ type:String },
    subcategory:{ type:String },
    isactive:{type:Boolean},
    seller_id:{type:mongoose.Schema.Types.ObjectId, ref:"users"}
},{
    timestamps:true
}))
 

module.exports = {
    products
 }