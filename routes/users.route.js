const usersController = require("../controllers/users.controller");

var express = require("express");

var router = express.Router();
router.get("/downloader/Dregister",(req,res)=>{
    
    res.render("Dregister"); 
});



router.get("/contributor/Cregister",(req,res)=>{
    
    res.render("Cregister"); 
})

router.get("/login",(req,res)=>{
    res.render("login");
})

router.get("/prelogin",(req,res)=>{
 res.render("prelogin");

})
router.post("/downloader/Dregister", usersController.register);
router.post("/contributor/Cregister", usersController.cregister);
router.post("/login", usersController.login);


router.get("/logout",(req,res)=>{
    
    req.session.isAuth=false;
    res.status(200).clearCookie('connect.sid', {
        path: '/'
      });
    req.session.destroy((err)=>{
        if(err) throw err;
        
        res.redirect("/home");
    })
})

router.get("/forgetPassword",(req,res)=>{
    res.render("forgetPassword")
})

router.post("/forgetPassword",usersController.forgetPassword);
   
router.get("/resetPassword/:id/:token",usersController.chkresetPassword);
router.post("/resetPassword/:id/:token",usersController.resetPassword);
module.exports = router;