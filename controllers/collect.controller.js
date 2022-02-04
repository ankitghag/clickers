const collectService = require("../services/collect.service");

exports.getCollection=(req,res,next)=>{
    const data={
        userid:req.session.userid
    }
    collectService.getCollection(data,(error,result)=>{
        if(error){
            console.log(error)
            res.render("bad request")
        }

        res.send(result)
    })
}

exports.postCollection=(req,res,next)=>{
    console.log(req.query.imgSrc);
    console.log(req.body)
if('collectionName' in req.body){
    const data={
        imgsrc:req.query.imgSrc,
        userid:req.session.userid,
        collectionName:req.body.collectionName
    }

    collectService.postExistCollection(data,(error,result)=>{
        if(error){
            return res.send("bad request ")
        }
     
        return res.redirect("/photo/"+data.imgsrc.substr(1,))
    })
}
else if(req.body.title.length<1){
    return res.send("you had not set the title")

}

else{
    const data={
        imgsrc:req.query.imgSrc,
        title:req.body.title,
        userid:req.session.userid
    }

    collectService.postNewCollection(data,(error,result)=>{
        if(error){
            return res.send(error)
        }
     return res.redirect("/your-Profile")
       // return res.redirect("/photo/"+data.imgsrc.substr(1,))
    })
    
}


 
/* console.log('collectionName' in req.body);
    
    return res.send("upload msg") */
}

exports.getuserCollection=(req,res,next)=>{
  
    const data={
        userid:req.session.userid
    }

   return collectService.getuserCollection(data,(error,result,result1)=>{
  
        if(error){
            return res.send(error)
        }
       else if(result=="nocollection"){
            return res.send("NoCollection");
        }
       
            const CDetail={
                collectionName:result,
                collectionPhotos:result1
            }

         console.log(CDetail)
            return res.send(CDetail)
            
       

   
    })

}


exports.specificCollection=(req,res,next)=>{
    const data={
        userid:req.session.userid,
        Cname:req.params.Cname
    }
    collectService.specificCollection(data,(error,result)=>{
        if(error){
            console.log(error)
            res.render("bad request")
        }
        console.log(result)
        console.log(req.params)
        res.render("collection",{imgsrc:result,Cname:data.Cname})
    }) 
    
}