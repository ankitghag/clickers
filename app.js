require("dotenv").config();
const express = require('express');
var mysql=require('mysql2');
const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken");
//const usersController = require("../controllers/users.controller");
const path=require("path");
const session=require("express-session");
//const mysql=require("mysql");
//const MySQLStore = require('express-mysql-session')(session);
const MySQLStore = require('connect-mysql')(session);
const nodemailer = require('nodemailer');
const usersRoutes = require("./routes/users.route");
const usersupload = require("./routes/users.upload");
const userseditProfile= require("./routes/users.edit-profile");
const homePage = require("./routes/user.home");
const userProfile = require("./routes/user-profile");
const photosreq = require("./routes/user.photo");
const userlike=require("./routes/user.like");
const userdownload=require("./routes/user.download");
const contributorProfile=require("./routes/contributor.Profile");
const ranking=require("./routes/user.leaderboard");
const search=require("./routes/user.search");
const collect=require("./routes/user.collect");
const message=require("./routes/user.message");
const discover=require("./routes/user.discover");
const deletes=require("./routes/user.delete");

const db=require("./db_config");
const app = express();
const port = process.env.PORT||3000;

/*  var options = {
  config: {
    user: 'root', 
    password: 'password',
    database: 'stock',
    table:'session' 
  }
}  */ 

  var options = {
  config: {
     host:process.env.hostdb,
  user:process.env.userdb,
  password:process.env.passowrddb,
  database:process.env.databasedb,
    table:'session' 
  }
}  
// setting the view engine
app.set('view engine', 'ejs');
const staticPath=path.join(__dirname,'./public');


app.use(express.static(staticPath));

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded());

/*app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  
}));*/

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 3,
    expires: 1000 * 60 * 60 * 24 * 3
  },
  store: new MySQLStore(options) // Change the express session store
}));

app.locals.navauth=false;
const navAuth= (req,res,next)=>{
 console.log(req.session.isauth);
  

   app.locals.navauth=req.session.isauth;
  
 
   next();
} 


const isAuth=async(req,res,next)=>{
  await console.log(req.session.isauth);
  if(req.session.isauth){
   
    next();
  }
  else{

   return res.redirect("/login");
  }
}





// routing the register

app.use("/",usersRoutes);
app.use("/cupload",isAuth,navAuth,usersupload);
app.use("/edit-profile",isAuth,navAuth,userseditProfile)
app.use("/your-profile",isAuth,navAuth,userProfile)
app.use("/home",navAuth,homePage)
app.use("/photo",navAuth, photosreq);
app.use("/like",isAuth,navAuth,userlike);
app.use("/download",navAuth,userdownload);
app.use("/contributor",navAuth,contributorProfile);
app.use("/leaderBoard",navAuth,ranking);
app.use("/search",navAuth,search);
app.use("/collect",isAuth,navAuth,collect);
app.use("/message",isAuth,message);
app.use("/discover",navAuth,discover);
app.use("/delete",deletes);
/*app.get('/login', (req, res) => {
  res.render('login');
})

app.get('/signup', (req, res) => {
    res.render('signup');
  })
//  app.use(express.static(staticPath));
  app.get('/home', (req, res) => {
    res.render('home');
  })*/


/* app.get("/home",navAuth,(req,res)=>{
  /*console.log(req.session.userid);
  console.log(req.session.id);
  console.log(req.session);
  console.log(app.locals.navauth);
console.log("navauth value" +app.locals.navauth);
  res.render("home",);
}); */

/* app.get("/home",navAuth,homePage.getImages);
app.post("/home",navAuth,) */

app.get("/prelogin",(req,res)=>{
  res.render('prelogin');
});





app.listen(port ,() => {
  console.log(`Example app listening at http://localhost:${port}`)
})
