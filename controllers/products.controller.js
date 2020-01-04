const { productsModel, categoryModel, subcategoryModel  } = require("../models/index");

const { addProductValidate, validateId } = require("../validations/products.validate");

const {ObjectId} = require("mongoose").Types;

const productService = require("../services/productService");


exports.addProduct = async( req, res) =>{
    try {

        if(!req.files){
          return  SEND_RESPONSE(res,[],"Please select file.",STATUS_CODE.BAD_REQUEST);
        }

        // do some stuff related to files
        req = productService.addFilesToBody(req);
        
        //extract data
        let { category, subcategory, productname } = req.body;    
        
        //validations
        let { error } = addProductValidate(req.body);
        
        if (error) return SEND_RESPONSE(res,[],error.details[0].message,STATUS_CODE.BAD_REQUEST);

        // let isvalidcount = userService.checkcount(req.body);   

        // if(!isvalidcount) return SEND_RESPONSE(res,[],"Counts didn't match.",STATUS_CODE.BAD_REQUEST)

        let category1 = await categoryModel.findOne({category_name:category});
        let subcategory1 = await subcategoryModel.findOne({subcategory_name:subcategory});

        if( !category1 || !subcategory1 ) return SEND_RESPONSE(res,[],"Either category or subcategory does not exists ",STATUS_CODE.NOT_FOUND);

        let product = await productsModel.findOne(
           { $and: 
                 [
                    { category: category },
                    { subcategory: subcategory },
                    { productname: productname }
                 ] 
            }
        );

        if ( product ) return SEND_RESPONSE(res,[],MESSAGE.ALREADY_EXISTS,STATUS_CODE.ALREADY_EXISTS);

        await productsModel(req.body).save();

        return SEND_RESPONSE(res,[],MESSAGE.CREATE_DATA,STATUS_CODE.CREATED);

} catch (error) {
    SEND_RESPONSE(res,[],error,STATUS_CODE.INTERNAL_SERVER_ERROR);
}
}


exports.getProducts = async(req,res)=>{
    try {
       let { limit, skip, search } = req.query; 


       let match =  { $or :
                            [
                                { category: search },
                                { subcategory: search  },
                                { brand : search }   
                            ]
                    }

        limit = parseInt(limit);
        skip = parseInt(skip);
        search = search ? match : {}

        let products = await productsModel.aggregate([
        //  {$match:  match  },   
        {$skip:skip},
        {$limit:limit}
       ]);



       const data = JSON.parse(JSON.stringify(products));



       const fs= require('fs');

       let datab ;
      let result = await data.map((product)=>{
            product.images.map(async(data)=>{
                  const path1 = data;
                  await fs.readFile(path1,(err,data1)=>{
                       if(err) return res.status(404).send({});
                       product.imagesdata = [];
                       product.imagesdata.push({data: data1.buffer});
                       datab = data1;
                   })
             })
             return product; 
       })

       console.log(result);
       let res12 = datab;;
 
       SEND_RESPONSE(res, res12 ,MESSAGE.SUCCESS,STATUS_CODE.OK);

    } catch (error) {
        SEND_RESPONSE(res,[],error,STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}

exports.searchBy = async( req,res)=>{
    try {
        
        //search by brand and select 2 
        //search by category select 2 
        //search by subcategory select 2

        let { search:word } = req.params;

       if(!search) return SEND_RESPONSE(res,[],"please provide search parameter",STATUS_CODE.BAD_REQUEST);   

        let search = "^" + word + ".*" ;

        let searchby = await productsModel.aggregate([
            {$match:
                { $or :
                [
                     { category: new RegExp(search, "i") },
                     { subcategory: new RegExp(search,"i") },
                     { brand : new RegExp(search,"i")}   
                ]
                }
            },
            {$project:{ productname:1 }},
            {$limit:5}
        ])
        
       return SEND_RESPONSE(res, searchby ,MESSAGE.SUCCESS,STATUS_CODE.OK);

    } catch (error) {
        SEND_RESPONSE(res,[],error,STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}

exports.deleteProduct = async(req,res)=>{
    try {

        let { id } = req.body;

        //validate id 
        let {error } = validateId(req.body);

        if (error) return SEND_RESPONSE(res,[],error.details[0].message,STATUS_CODE.BAD_REQUEST);

        let product = await productsModel.findOne({_id:ObjectId(id)},{_id:1});

        if(!product) return SEND_RESPONSE(res, [] ,MESSAGE.NOT_FOUND,STATUS_CODE.NOT_FOUND);

        await productsModel.deleteOne({_id:product._id});
        
       return SEND_RESPONSE(res, [] ,MESSAGE.DATA_DELETED_SUCCESS, STATUS_CODE.NO_CONTENT);

    } catch (error) {
        SEND_RESPONSE(res,[],error,STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}


exports.getProduct = async(req,res)=>{
    try {

        let fs = require("fs");
        
        const path1 = appRoot + "/uploads/";
        // photos-1577798438292.jpg";

        let arr = [],counter = 0;

        fs.readdir(path1,(err,data)=>{
           if(err) return err;
           console.log(data);
           data.map((data1,i)=>{
                let res1 = fs.createReadStream(path1 + data1 );
                 res1.pipe(res);   
            })
            return data;
        });
        
        res.writeHead(200,{"content-Type":"image/jpeg"});
    
    } catch (error) {
        SEND_RESPONSE(res,[],error,STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}