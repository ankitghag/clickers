const homePageService = require("../services/home.service");

exports.getImages = (req, res, next)=>{
 
    homePageService.getImages((err,result)=>{
        if(err){
            console.log(err);
           return res.status(400).send({ success: 0, data: "Bad request" });
        }
       /*  var dataimg=JSON.stringify(result) */
        /* return res.render("home",{data:dataimg}) */
       
        return res.render("home",{result})
    })

 
}

exports.getMoreImages = (req, res, next)=>{

  const data={
      start:parseInt(req.body.startFrom)
  }
    homePageService.getMoreImages(data,(err,result)=>{
        if(err){
            console.log(err);
           return res.status(400).send({ success: 0, data: "Bad request" });
        }
       /*  var dataimg=JSON.stringify(result) */
        /* return res.render("home",{data:dataimg}) */
      
        return res.send(result)
    })

 
}