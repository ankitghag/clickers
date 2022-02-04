const contributorProfileService = require("../services/contributorProfile.service");

exports.contributorDetails=(req,res,next)=>{
    var a=req.params.contributorname;
    var b=a.substr(1,);
  //  var username=b.split(" ");
   // console.log(username)
    const data={
        firstname:b.trim().split(" ")[0],
        lastname:b.trim().split(" ")[1]
    }
    
    contributorProfileService.contributorDetails(data,(error,result,result1,result2,result4)=>{
        if(error){
            console.log(error);
           return res.status(400).send({ success: 0, data: "Bad request" });
        }
       
       

            return res.render("contributorProfile",{fname:result,lname:result1,Avatar:result2,image:result4});
        
    })

}