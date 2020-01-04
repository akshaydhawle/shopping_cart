const config = require("config"); 

function addFilesToBody(req){
    let files = [];

    files = req.files.photos.map((data)=> 
     {  return  data.filename;
    })
   
    req.body.images = files ;
    req.body.productimage = req.files.productimage[0].filename ;

    return req;
}

function checkcount(body){
 let colorcount =0, sizecount = 0;   
 
 body.colors.map( (data) => colorcount += data.colorCount );

 body.sizes.map((data)=> sizecount += data.sizeCount )

 let count = body.count;

 if(colorcount === sizecount && sizecount === count ){
     return true; 
 }

 return false;
}

module.exports = {
    checkcount,
    addFilesToBody
}