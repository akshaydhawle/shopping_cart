const mongoose = require('mongoose');

const cart = mongoose.model("cart",new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
    quantity: { type: Number, default: 1 },
    price: Number,
    total: Number,
},
{
    timestamps:true
}
)) 

module.exports = {
    cart
}