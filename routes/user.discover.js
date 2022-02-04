const discoverController=require("../controllers/discover.controller");
var express = require("express");
var router = express.Router();
router.get("/",(req,res)=>{
    return res.render("discover")
})
router.get("/discoverCategories",discoverController.getCategories);
router.get("/:categoriename",discoverController.getSpecificCategorie)
module.exports=router