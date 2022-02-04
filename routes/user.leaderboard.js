const leaderboardController=require("../controllers/leaderboard.controller");
var express = require("express");
var router = express.Router();
router.get("/",leaderboardController.getRanking)

router.get("/allTime",leaderboardController.getAllTimeRanking)
module.exports=router;