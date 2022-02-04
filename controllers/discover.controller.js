const discoverService = require("../services/discover.service");

exports.getCategories=(req,res,next)=>{
    discoverService.getCategories((err,result)=>{
        if(err){
            console.log(err);
          
            return res.send(err)
        }
        console.log(result)
        res.send(result)
       /*  return res.render("discover",{results:result}) */
    })
}


exports.getSpecificCategorie=(req,res,next)=>{

    console.log(req.params)
     const data={
        categoriename:req.params.categoriename
    } 
   discoverService.getSpecificCategorie(data,(err,result)=>{
        if(err){
            console.log(err);
          
            return res.send(err)
        }
        console.log(result)
        res.render("specificCategorie",{CategorieName:data.categoriename,photoUrl:result})
       
    }) 
}