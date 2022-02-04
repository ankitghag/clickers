const editprofileService = require("../services/edit-profile.service");
const bcrypt=require('bcryptjs');
var multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: './public/Avatar',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const uploadProfile = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            // console.log(req)
            console.log('Only .png, .jpg and .jpeg format allowed!')
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
}).single('myfile');

exports.editProfile=(req,res,next)=>{
   
    const data={
        userid:req.session.userid,
    }
    editprofileService.editprofile(data,(err,result,result1,result2,result3)=>{
        if(err){
            console.log(err);
           return res.status(400).send({ success: 0, data: "Bad request" });
        }

        return res.render("edit-profile",{fname:result,lname:result1,email:result2,Avatar:result3});

    })
}

exports.updateProfiles=(req,res,next)=>{
    const data1={
        userId:req.session.userid
    }
    editprofileService.updateProfile(data1,(err,resulturl)=>{
        if(err){
            console.log("this is error"+err)
            return res.redirect("/edit-profile")
        }
        console.log(resulturl);
        //return res.redirect("/edit-profile")

        var avatarurl=resulturl[0].AvatarUrl;
        
        uploadProfile(req,res,(err)=>{
            console.log(req)
            if (err) {
                res.render("edit-profile")
            }
            else{
                if (req.file == "" || 'file' in req == true){
                     avatarurl= "./Avatar/" + req.file.filename;
                }
               // console.log(req)
               //console.log(avatarurl)
                var firstName=req.body.fname;
                var lastName=req.body.lname;
                var Email=req.body.email; 
               
                if (firstName=== "") {
                   // fmsg = "firstname cant be empty";
                     return res.redirect("/edit-profile");
                  }
                  else if (!(/^([a-zA-Z]{3,})$/.test(firstName))) {
                    //fmsg = "firstname cant contain number oir special char";
                    //return res.render("register",{fmsg});
                    return res.redirect("/edit-profile");
                  }
                
                
                  //validation of last name
                  if (lastName === "") {
                   // lmsg = "lastname cant be empty";
                    //return res.render("register",{lmsg});
                    return res.redirect("/edit-profile");
                  }
                  else if (!(/^([a-zA-Z]{3,})$/.test(lastName))) {
                    //lmsg = "lastname cant contain number oir special char";
                    //return res.render("register",{lmsg});
                    return res.redirect("/edit-profile");
                  }
                
               
                   const data={
                       userid:req.session.userid,
                        firstName:req.body.fname,
                       lastName:req.body.lname,
                       Email:req.body.email, 
                       AvatarUrl:avatarurl
                   } 
                  // console.log(data)
                   editprofileService.updateProfile1(data,(err,result)=>{
                       if(err){
                           console.log("this is error"+err)
                           return res.redirect("/edit-profile")
                       }
                       
                       return res.redirect("/edit-profile")
                      
                       
                   })  
    
            }
        })
       
        
    })  
   /*  var avatarurl=null;
    uploadProfile(req,res,(err)=>{
        if (err) {
            res.render("edit-profile")
        }
        else{
            if (req.file == "" || 'file' in req == true){
                 avatarurl=req.file.destination+ "/" + req.file.filename;
            }
           // console.log(req)
           //console.log(avatarurl)
            var firstName=req.body.fname;
            var lastName=req.body.lname;
            var Email=req.body.email; 
           
            if (firstName=== "") {
               // fmsg = "firstname cant be empty";
                 return res.redirect("/edit-profile");
              }
              else if (!(/^([a-zA-Z]{3,})$/.test(firstName))) {
                //fmsg = "firstname cant contain number oir special char";
                //return res.render("register",{fmsg});
                return res.redirect("/edit-profile");
              }
            
            
              //validation of last name
              if (lastName === "") {
               // lmsg = "lastname cant be empty";
                //return res.render("register",{lmsg});
                return res.redirect("/edit-profile");
              }
              else if (!(/^([a-zA-Z]{3,})$/.test(lastName))) {
                //lmsg = "lastname cant contain number oir special char";
                //return res.render("register",{lmsg});
                return res.redirect("/edit-profile");
              }
            
           
               const data={
                   userid:req.session.userid,
                    firstName:req.body.fname,
                   lastName:req.body.lname,
                   Email:req.body.email, 
                   AvatarUrl:avatarurl
               } 
              // console.log(data)
               editprofileService.updateProfile(data,(err,result)=>{
                   if(err){
                       console.log("this is error"+err)
                       return res.redirect("/edit-profile")
                   }
                   
                   return res.redirect("/edit-profile")
                  
                   
               })  

        }
    }) */
    
   
 //validation of firstname
 /* var firstName=req.body.fname;
 var lastName=req.body.lname;
 var Email=req.body.email; 

 if (firstName=== "") {
    // fmsg = "firstname cant be empty";
      return res.redirect("/edit-profile");
   }
   else if (!(/^([a-zA-Z]{3,})$/.test(firstName))) {
     //fmsg = "firstname cant contain number oir special char";
     //return res.render("register",{fmsg});
     return res.redirect("/edit-profile");
   }
 
 
   //validation of last name
   if (lastName === "") {
    // lmsg = "lastname cant be empty";
     //return res.render("register",{lmsg});
     return res.redirect("/edit-profile");
   }
   else if (!(/^([a-zA-Z]{3,})$/.test(lastName))) {
     //lmsg = "lastname cant contain number oir special char";
     //return res.render("register",{lmsg});
     return res.redirect("/edit-profile");
   }
 

    const data={
        userid:req.session.userid,
         firstName:req.body.fname,
        lastName:req.body.lname,
        Email:req.body.email, 
        
    } 
    editprofileService.updateProfile(data,(err,result)=>{
        if(err){
            console.log("this is error"+err)
            return res.redirect("/edit-profile")
        }
        
        return res.redirect("/edit-profile")
       
        
    })   */
    
}

exports.changePassword=async(req,res,next)=>{

//validation

/*var cpassword=req.body.psw;
var npassword=req.body.newpsw;

const data1={
    userid:req.session.userid
}
editprofileService.checkPassword(data1).then((result)=>{
console.log(result)
  
}).catch((err)=>{
    console.log(err);
})*/
var currentPassword=req.body.psw;
if(currentPassword===""){
    // pmsg="password is empty";
   // return res.redirect("/edit-profile/changePassword");
   console.log("password is empty")
    return res.render("changePassword",{errmsg:"password is empty",errmsg1:""});
   }

//console.log("this is the value of  ck:"+ck);
var newPassword=req.body.newpsw;
if(newPassword===""){
    // pmsg="password is empty";
   // return res.redirect("/edit-profile/changePassword");
   
    return res.render("changePassword",{errmsg:"",errmsg1:"password is empty"});
   }
   else if(newPassword.length<6){
    // pmsg="pass word length should be greater then 6";
    //return res.redirect("/edit-profile/changePassword");
    return res.render("changePassword",{errmsg:"",errmsg1:"pass word length should be greater then 6"});
   }

   else if((/[a-z]/.test(newPassword))===false || (/[A-Z]/.test(newPassword))===false || (/[0-9]/.test(newPassword))===false || (/.[@\!#\$%\^&\*\(\)\-_\+]*./.test(newPassword))===false){
    // pmsg="password should follow the give constraints";
    //return res.redirect("/edit-profile/changePassword");
    return res.render("changePassword",{errmsg:"",errmsg1:"password should follow the give constraints"});
   }

const hashPassword=async (pwd)=>{
    var salt = await bcrypt.genSalt(10);
  
    return await bcrypt.hash(pwd, salt);
  }
    const data={
        userid:req.session.userid,
        currentPassword:req.body.psw,
        newPassword:await hashPassword(req.body.newpsw)
    }

    editprofileService.changePassword(data,(err,result)=>{
        if(err){
            console.log(err);
           return res.render("changePassword",{errmsg:err});
        }

        return res.redirect("/edit-profile")
    })
}