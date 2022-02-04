const likeService = require("../services/like.service");

exports.likeDetails=(req,res,next)=>{
 if(req.session.isauth==true||req.session.isauth=="true"){
    const data={
        imgsrc:req.body.likedimgsrc,
        likedByid:req.session.userid
    }

    likeService.likeDetails(data,(error,result)=>{
        if(error){
            console.log(error);
           return res.status(400).send({ success: 0, data: "Bad request" });
        }

        return res.send(result)
    })
 }
 else{
    return res.send("notlogged")
 }
    
}