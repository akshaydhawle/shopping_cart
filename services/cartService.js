
const mapToModel =( cart, body )=>{
 
    let { user, product, quantity, price, total } = body;

    let arr = {};
    cart.user = user;
    arr.product = product;
    arr.quantity = quantity;
    arr.price = price;
    arr.total = total;
    cart.cart.push(arr);

    return cart;

}


module.exports = {
   mapToModel
}