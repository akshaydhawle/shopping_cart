const { ObjectId } = require("mongoose").Types;
const { cartModel } = require("../models/index");
const { validateAddCart, validateUpdateCart,
      validateSingle, validateUser } = require("../validations/cart.validate");


exports.addToCart = async(req,res)=>{
 try {

    //extract data 
    let { user, product, quantity, total, price  } = req.body;

    //validations
    let { error } = validateAddCart(req.body);

    if (error) return SEND_RESPONSE(res,[],error.details[0].message,STATUS_CODE.BAD_REQUEST);


   //check user exists or not 
   let userExists = await cartModel.findOne({user:user});

   //store data 
   if(!userExists )     
    {
       await cartModel(req.body).save(); 
    }  
    else{
           //push data
         let Item = await cartModel.findOne({product:ObjectId(product)});

         if(!Item){
            await cartModel(req.body).save(); 
         } 
         else{
            Item.quantity += quantity;
            Item.total += total;

            let { quantity:Itemquantity, total:Itemtotal } = Item;

            await cartModel.updateOne(
               {$and:[{_id:Item._id},{product:Item.product}]  },
               {$set : {
                     quantity: Itemquantity,
                     total: Itemtotal          
               }
            }
               )
         
         }   
    }    
    
    return SEND_RESPONSE(res,[],MESSAGE.CREATE_DATA,STATUS_CODE.CREATED);

 } catch (error) {
    SEND_RESPONSE(res,[],error,STATUS_CODE.INTERNAL_SERVER_ERROR);
 }
}

exports.updateCart = async( req, res )=>{
   try {
      //extract data
     let { user, product, quantity, price, total } = req.body;

     //validations
    let { error } = validateUpdateCart(req.body);

    if (error) return SEND_RESPONSE(res,[],error.details[0].message,STATUS_CODE.BAD_REQUEST);

    
    //check user exists or not 
   let userExists = await cartModel.findOne({user:user});
   
   if(!userExists) return   SEND_RESPONSE(res,[],MESSAGE.NOT_FOUND,STATUS_CODE.NOT_FOUND);
    
    // find item exists or not 
    let item = await cartModel.findOne({product:ObjectId(product)});

    if(!item) return SEND_RESPONSE(res,[],"Product Not Found",STATUS_CODE.NOT_FOUND);
    
   await cartModel.updateOne(
      {$and:[{_id:userExists._id},{product:item.product }]  },
      {$set : {
         quantity:quantity,
         price:price,
         total:total  
      }
   }
   )
   
   return SEND_RESPONSE(res,[],MESSAGE.CREATE_DATA,STATUS_CODE.CREATED);

} catch (error) {
    SEND_RESPONSE(res,[],error,STATUS_CODE.INTERNAL_SERVER_ERROR);
   }
}

exports.deleteItem = async(req ,res )=>{
   try {
   let { id } = req.body;
    
   //validate id
   let { error } = validateSingle(req.body); 
   
   if (error) return SEND_RESPONSE(res,[],error.details[0].message,STATUS_CODE.BAD_REQUEST);

   //check record exists or not
   let record = await cartModel.findOne({_id:ObjectId(id)});

   if(!record) return SEND_RESPONSE(res,[],MESSAGE.NOT_FOUND,STATUS_CODE.NOT_FOUND);

   await cartModel.deleteOne({_id:ObjectId(id)});

    return SEND_RESPONSE(res,[],MESSAGE.DATA_DELETED_SUCCESS ,STATUS_CODE.NO_CONTENT);
      
   } catch (error) {
      return SEND_RESPONSE(res,[],MESSAGE.CREATE_DATA,STATUS_CODE.CREATED);
   }
}


exports.deleteAllItem = async(req,res)=>{
   try {

      let { user } = req.body;

      //validatations
      let { error } = validateUser(req.body); 
      if (error) return SEND_RESPONSE(res,[],error.details[0].message,STATUS_CODE.BAD_REQUEST);
          
      //delete data
      await cartModel.remove({user:{$eq:ObjectId(user)}} );

      return SEND_RESPONSE(res,[],MESSAGE.DATA_DELETED_SUCCESS ,STATUS_CODE.NO_CONTENT);

   } catch (error) {
      return SEND_RESPONSE(res,[],MESSAGE.CREATE_DATA,STATUS_CODE.CREATED);
   }
}

exports.findAllItems = async(req,res)=>{
   try {

      let {user} = req.body;
            //validatations
      let { error } = validateUser(req.body); 
      if (error) return SEND_RESPONSE(res,[],error.details[0].message,STATUS_CODE.BAD_REQUEST);
                
      let AllItemsInCart = await cartModel.find({user:ObjectId(user)});

      return SEND_RESPONSE(res,AllItemsInCart, MESSAGE.SUCCESS ,STATUS_CODE.OK);
      
   } catch (error) {
      return SEND_RESPONSE(res,[],MESSAGE.CREATE_DATA,STATUS_CODE.CREATED);
   }
}

exports.findOneItem = async(req,res)=>{
   try {

      let { id } = req.body;
            //validatations
      let { error } = validateSingle(req.body); 
      if (error) return SEND_RESPONSE(res,[],error.details[0].message,STATUS_CODE.BAD_REQUEST);
                
      let  Item  = await cartModel.find({_id:ObjectId(id)});

      if(Item) return  SEND_RESPONSE(res,[],MESSAGE.NOT_FOUND,STATUS_CODE.NOT_FOUND);

      return SEND_RESPONSE(res,Item, MESSAGE.SUCCESS ,STATUS_CODE.OK);
      
   } catch (error) {
      return SEND_RESPONSE(res,[],MESSAGE.CREATE_DATA,STATUS_CODE.CREATED);
   }
}
