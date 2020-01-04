const { commentModel } = require("../models/index"); 

const { validateAddComment, validateId } = require("../validations/comment.validate");

const {ObjectId } = require("mongoose").Types;
exports.addCommentToProduct = async(req,res)=>{
    try {

        let {} = req.body;

        //validations
        let {error } = validateAddComment(req.body);

        if (error) return SEND_RESPONSE(res,[],error.details[0].message,STATUS_CODE.BAD_REQUEST);
       
        let comment = await commentModel.findOne({$and:[
            { user: ObjectId(user) },
            { product: ObjectId(product) }
        ]}) 

        if(comment) return SEND_RESPONSE(res,[],"One user can comment to product only once.",STATUS_CODE.BAD_REQUEST); 

        await commentModel(req.body).save();

        return SEND_RESPONSE(res,[],MESSAGE.SUCCESS,STATUS_CODE.CREATED);

    } catch (error) {
        SEND_RESPONSE(res,[],error,STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}


///only admin can delete comment and own user
exports.deleteComment = async(req,res)=>{
    try {
      let { id } = req.body;  
      
      //validations
      let {error } = validateId(req.body);

      if (error) return SEND_RESPONSE(res,[],error.details[0].message,STATUS_CODE.BAD_REQUEST);
     
      let isExists = await commentModel.findOne({_id:ObjectId(id)},{_id:1});

      if(!isExists) return SEND_RESPONSE(res,[],MESSAGE.NOT_FOUND,STATUS_CODE.NOT_FOUND);

      await commentModel.deleteOne({_id:isExists._id});

      return SEND_RESPONSE(res,[],"",STATUS_CODE.NO_CONTENT);

    } catch (error) {
        SEND_RESPONSE(res,[],error,STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}