const mongoose = require('mongoose');

const comments = mongoose.model("comments",new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
    comment:{type:String, default:""},
    rating:{type:Number}
},
{
    timestamps:true
}
)) 

module.exports = {
    comments
}