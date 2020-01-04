const express = require("express");

const user = require("../routes/user.route");
const category = require('../routes/category.route');
const product = require("../routes/products.route");
const cart = require("../routes/cart.route");
const comment = require("../routes/comment.route");

module.exports =(app)=>{

    app.use(express.json());
    app.use(express.urlencoded({extended:true}));

    app.use('/user',user);
    app.use('/category',category);
    app.use('/product',product);
    app.use('/cart',cart);
    app.use('/comment',comment);

}


