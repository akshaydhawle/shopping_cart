const { users:userModel }= require("./users.model.js");
const { category:categoryModel, subcategory:subcategoryModel } = require("./category.model");
const {products:productsModel } = require("./products.model")
const { cart : cartModel} = require("./cart.model");
const {comments:commentModel} = require("./comment.model");
module.exports ={
    userModel,
    categoryModel,
    subcategoryModel,
    productsModel,
    cartModel,
    commentModel
}