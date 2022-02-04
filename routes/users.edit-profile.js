const editProfileController = require("../controllers/edit-profile.controller");
var express = require("express");
var router = express.Router();

router.get("/",editProfileController.editProfile);
router.post("/",editProfileController.updateProfiles);

router.get("/changePassword",(req,res)=>{

    res.render("changePassword",{errmsg:" ",errmsg1:" "});
})

router.post("/changePassword",editProfileController.changePassword);
module.exports=router;