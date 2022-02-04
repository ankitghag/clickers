const contributorProfileController=require("../controllers/contributorProfile.controller");
var express = require("express");
var router = express.Router();
router.get("/:contributorname",contributorProfileController.contributorDetails)
    

module.exports=router;