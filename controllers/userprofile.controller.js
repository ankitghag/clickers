const userprofileService = require("../services/userprofile.service");

exports.showProfile=(req,res,next)=>{
        const data={
            userid:req.session.userid,
        }

        userprofileService.showProfile(data,(err,result,result1,result2)=>{
            if(err){
                console.log(err);
               return res.status(400).send({ success: 0, data: "Bad request" });
            }

            userprofileService.userUploads(data,(error,result3)=>{
                if(error){
                    console.log(error);
                   return res.status(400).send({ success: 0, data: "Bad request" });
                }

                return res.render("yourProfile",{fname:result,lname:result1,Avatar:result2,image:result3});
            })
    
           
        })

     
       
    
}