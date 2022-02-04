const messageController=require("../controllers/message.controller");
var express = require("express");
var router = express.Router();
router.post("/",messageController.sendMessage)
router.get("/reply",(req,res)=>{
   // console.log(req);
    console.log(req.query.replyTo.split(" ")[0])
    console.log(req.query.replyFrom)
    res.render("messageReply",{From:req.query.replyFrom,firstName:req.query.replyTo.split(" ")[0],lastName:req.query.replyTo.split(" ")[1]})
})

router.post("/reply", messageController.sendReplyMessage)
module.exports=router;