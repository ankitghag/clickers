const usersService = require("../services/users.service");
const jwt=require("jsonwebtoken");
const nodemailer = require('nodemailer');
const bcrypt=require('bcryptjs');
var fmsg = "";
var lmsg = "";
var Emsg="";
var pmsg="";

  
   
exports.register = async (req, res, next) => {
  // Validation area
  var fname = req.body.firstName;
  var lname = req.body.lastName;
  var Email=req.body.email;
  var Password=req.body.psw;
  //validation of firstname
  if (fname === "") {
   // fmsg = "firstname cant be empty";
     return res.redirect("/register");
  }
  else if (!(/^([a-zA-Z]{3,})$/.test(fname))) {
    //fmsg = "firstname cant contain number oir special char";
    //return res.render("register",{fmsg});
    return res.redirect("/register");
  }


  //validation of last name
  if (lname === "") {
   // lmsg = "lastname cant be empty";
    //return res.render("register",{lmsg});
    return res.redirect("/register");
  }
  else if (!(/^([a-zA-Z]{3,})$/.test(fname))) {
    //lmsg = "lastname cant contain number oir special char";
    //return res.render("register",{lmsg});
    return res.redirect("/register");
  }



  //validating email
  /*if (!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(Email))) {
    Emsg="invalid email";
   }*/

   /*if(!(/^([a-zA-Z] +)(?:\\.[a-zA-Z0-9_+&*-]* )*@(?:[a-zA-Z0-9-]+\\.) + [a-zA-Z]{2, 7}/.test(Email))){
    //Emsg="invalid email";
    return res.redirect("/register");
   }*/


//validating password
   if(Password===""){
    // pmsg="password is empty";
    return res.redirect("/register");
   }
   else if(Password.length<6){
    // pmsg="pass word length should be greater then 6";
    return res.redirect("/register");
   }

   else if((/[a-z]/.test(Password))===false || (/[A-Z]/.test(Password))===false || (/[0-9]/.test(Password))===false || (/.[@\!#\$%\^&\*\(\)\-_\+]*./.test(Password))===false){
    // pmsg="password should follow the give constraints";
    return res.redirect("/register");
   }
 
   /*if (fmsg.length > 0 || lmsg.length > 0) {
    return res.render("register", { fmsg, lmsg ,pmsg});
  }*/
  // store correct data
const hashPassword=async (pwd)=>{
  var salt = await bcrypt.genSalt(10);

  return await bcrypt.hash(pwd, salt);
}

  const data = {

    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailId: req.body.email,
    password: await hashPassword(req.body.psw)
  };

  //var hashing=await hashPassword(req.body.psw);
  //console.log("this is hashing value: "+hashing);
  //console.log(typeof usersService);
  usersService.register(data, (error, results) => {
    if (error) {
      console.log(error);
      console.log(req.body);
      return res.status(400).send({ success: 0, data: "Bad request" });
    }

    return res.status(200).redirect("/login");

  });
};


//contributor signup
exports.cregister = async (req, res, next) => {
  // Validation area
  var fname = req.body.firstName;
  var lname = req.body.lastName;
  var Email=req.body.email;
  var Password=req.body.psw;
  //validation of firstname
  if (fname === "") {
   // fmsg = "firstname cant be empty";
     return res.redirect("/register");
  }
  else if (!(/^([a-zA-Z]{3,})$/.test(fname))) {
    //fmsg = "firstname cant contain number oir special char";
    //return res.render("register",{fmsg});
    return res.redirect("/register");
  }


  //validation of last name
  if (lname === "") {
   // lmsg = "lastname cant be empty";
    //return res.render("register",{lmsg});
    return res.redirect("/register");
  }
  else if (!(/^([a-zA-Z]{3,})$/.test(fname))) {
    //lmsg = "lastname cant contain number oir special char";
    //return res.render("register",{lmsg});
    return res.redirect("/register");
  }



  //validating email
  /*if (!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(Email))) {
    Emsg="invalid email";
   }*/

   /*if(!(/^([a-zA-Z] +)(?:\\.[a-zA-Z0-9_+&*-]* )*@(?:[a-zA-Z0-9-]+\\.) + [a-zA-Z]{2, 7}/.test(Email))){
    //Emsg="invalid email";
    return res.redirect("/register");
   }*/


//validating password
   if(Password===""){
    // pmsg="password is empty";
    return res.redirect("/register");
   }
   else if(Password.length<6){
    // pmsg="pass word length should be greater then 6";
    return res.redirect("/register");
   }

   else if((/[a-z]/.test(Password))===false || (/[A-Z]/.test(Password))===false || (/[0-9]/.test(Password))===false || (/.[@\!#\$%\^&\*\(\)\-_\+]*./.test(Password))===false){
    // pmsg="password should follow the give constraints";
    return res.redirect("/register");
   }
 
   /*if (fmsg.length > 0 || lmsg.length > 0) {
    return res.render("register", { fmsg, lmsg ,pmsg});
  }*/
  // store correct data


  const hashPassword=async (pwd)=>{
    var salt = await bcrypt.genSalt(10);
  
    return await bcrypt.hash(pwd, salt);
  }

  const data = {

    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailId: req.body.email,
    password: await hashPassword(req.body.psw)
  };
  //console.log(typeof usersService);
  usersService.cregister(data, (error, results) => {
    if (error) {
      console.log(error);
      console.log(req.body);
      return res.status(400).send({ success: 0, data: "Bad request" });
    }
    return res.status(200).redirect("/login");

  });
};




exports.login =(req, res, next) => {
  // Validation area
  const data = {
    emailId: req.body.email,
    password: req.body.psw,
  };
  usersService.login(data, (error, results,results1) => {
    if (error) {
      console.log(error);
      return res.status(400).send({ success: 0, data: "Bad request" });
    }
req.session.isauth = true;
    console.log(req.session.isauth);
    
    req.session.userid=results;
    req.session.userRole=results1;
    return req.session.save((err)=>{
      if(!err){
        console.log(req.session)
        res.status(200).redirect("/home");
      }
    }

    );
     
  });
};

exports.forgetPassword=(req,res,next)=>{
  const data={
    email:req.body.email
  }

  usersService.forgetPassword(data,(err,result)=>{
    if(err){
      console.log(err);
      return res.status(400).send({success:0,data:"bad request"});
    }
   
  const secret=process.env.jwt_secret+result[0].Password;
    console.log(secret);
 
const payload={
  email:result[0].Email,
  id:result[0].u_id
}

const token=jwt.sign(payload,secret,{expiresIn:"15m"});
console.log(token);

const link=`http://localhost:3000/resetPassword/${result[0].u_id}/${token}`;
//console.log(link);

var mail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'akghag100@gmail.com',
    pass: process.env.mail_server
  }
});

var mailOptions = {
  from: 'akghag100@gmail.com',
  to: 'ankitghag16@gmail.com',
  subject: 'Sending Email via Node.js',
  text: 'reset the password!',
  html:`<div><p>click below to reset the password</p><br><a href=${link}>${link}</a></div>`
};

mail.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

     return res.send(result)
  })
}


exports.chkresetPassword= (req,res,next)=>{
  const data={
    id:req.params.id,
    token:req.params.token
  }
 
 usersService.chkresetPassword(data,async (err,result)=>{
   if(err){
     console.log(err);
     return res.send({request:"bad request",status:400})
   }
   const secret=process.env.jwt_secret+result[0].Password;
  
   return await jwt.verify(data.token,secret,(err,decode)=>{
       if(err){
         console.log(err);
         return res.send("invalid user")
       }
       return res.render("resetPassword")
     })
  
  
  
 
 }) 
 
}

exports.resetPassword=async (req,res,next)=>{

  const data={
    id:req.params.id,
    token:req.params.token,
    newpassword:req.body.newpsw,
    confirmnewpassword:req.body.confirmnewpsw
  }

  if(data.newpassword==="" || data.confirmnewpassword===""){
    // pmsg="password is empty";
    return res.render("resetPassword");
   }
   else if(data.newpassword.length<6){
    // pmsg="pass word length should be greater then 6";
    return res.render("resetPassword");
   }

   else if((/[a-z]/.test(data.newpassword))===false || (/[A-Z]/.test(data.newpassword))===false || (/[0-9]/.test(data.newpassword))===false || (/.[@\!#\$%\^&\*\(\)\-_\+]*./.test(data.newpassword))===false){
    // pmsg="password should follow the give constraints";
    return res.render("resetPassword");
   }

   

  


usersService.chkresetPassword(data,async (err,result)=>{
  if(err){
    console.log(err);
    return res.status(400).send({request:"bad request"})
  }

  const secret=process.env.jwt_secret+result[0].Password;

  jwt.verify(data.token,secret,async (err,decode)=>{
    if(err){
      console.log("this is error  while verfiying token :"+err);
      return res.send("invalid user")
    }

    const hashPassword=async (pwd)=>{
      var salt = await bcrypt.genSalt(10);
    
      return await bcrypt.hash(pwd, salt);
    }

    if(data.newpassword===data.confirmnewpassword){
      //console.log(decode.email)
      const updatingdata={
        password:await hashPassword(data.newpassword),
        email:decode.email,
        id:decode.id
      }

      usersService.resetPassword(updatingdata,(err,result)=>{
        if(err){
          console.log("this is err while updating new password: "+err)
          return res.status(400).send({request:"bad request"});
        }
        console.log(updatingdata.password);
        return res.render("login");
      })

    }

    else{
      return res.render("resetPassword");
    }

  })
})

}