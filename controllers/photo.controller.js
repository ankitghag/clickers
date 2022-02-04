const photoService = require("../services/photo.service");

exports.photoAndDetails=(req, res, next)=>{
console.log(req.session)
//console.log(req)
    const data={
        avtarurl:"./"+req.params.folder+"/"+req.params.categories+"/"+req.params.src,
        userid:req.session.userid,
        auth:req.session.isauth
    }

  /*  photoService.Cfollower(data,(err,result1,result2)=>{
        if(err){
            console.log(err);
           return res.status(400).send({ success: 0, data: "Bad request" });
        }
       
    }) */
    
  
   console.log(data)
        photoService.photoAndDetails(data,(err,result1,result2,likestat,followstat)=>{
            if(err){
                console.log(err);
               return res.status(400).send({ success: 0, data: "Bad request" });
            }
            
            photoService.Cfollower(data,(err,result3,result4)=>{
                if(err){
                    console.log(err);
                   return res.status(400).send({ success: 0, data: "Bad request" });
                }
                
                console.log(typeof result2[0]['COUNT(photolikeBy)']);
              
               // console.log( result4[0]['COUNT(viewBy)']);
              
                console.log(followstat)
                return res.render("photo",{imgfolder:req.params.folder,imgcategories:req.params.categories,imgsrc:req.params.src,Avatar:result1[0].AvatarUrl,firstname:result1[0].firstName,lastname:result1[0].lastName,Likes: result2[0]['COUNT(photolikeBy)'],likeStatus:likestat,cfollower:result3[0]["COUNT(following_id)"],followStatus:followstat,views: result4[0]['COUNT(viewBy)']})
            })

           
        })

    
        
  
}

exports.cfollowing=(req,res,next)=>{
   
  const data={
      imgsrc:req.body.likedimgsrc,
      followingid:req.session.userid,
      auth:req.session.isauth
  }
if(req.session.isauth==true||req.session.isauth=="true"){
    photoService.cfollowing(data,(error,result)=>{
        if(error){
            console.log(error);
           return res.status(400).send({ success: 0, data: "Bad request" });
        }
         return res.send(result);
      })
}
else{
    return res.send("notlogged");
}
  
}


/* exports.photoviews=(req,res,next)=>{
   
    const data={
        imgsrc:req.body.likedimgsrc,
        followingid:req.session.userid
    }
  
    photoService.cfollowing(data,(error,result)=>{
      if(error){
          console.log(error);
         return res.status(400).send({ success: 0, data: "Bad request" });
      }
       return res.send(result);
    })
  } */
  
