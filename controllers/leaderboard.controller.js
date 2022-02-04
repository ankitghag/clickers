const leaderboardService = require("../services/leaderboard.service");

/* exports.getRanking=(req,res,next)=>{
    
    leaderboardService.getRanking((error,result,result1)=>{
        if(error){
            console.log(error);
            return res.send(error);
        }
        var data=result;
        leaderboardService.getRankerImageDetail(data,(error2,result2)=>{
            if(error2){
                console.log(error2);
                return res.send(error);
            }

             const data1=result;
            leaderboardService.getRankerDetail(data1,(error3,result3)=>{
                if(error3){
                    console.log(error3);
                    return res.send(error);
                }
                return res.render("leaderboard",{result,result1,result2,result3})
              
            }) 

         
        })
      
    })
} */

exports.getRanking=(req,res,next)=>{
  
    leaderboardService.getRanking((error,result)=>{
        if(error){
            console.log(error);
            return res.send(error);
        }
       
       if(result.length==0){
           console.log(result)
           return res.render("leaderboard",{data:"noupdate"})
       }
        leaderboardService.getRankerImageDetail(result,(error2,result2)=>{
            if(error2){
                console.log(error2);
                return res.send(error);
            }

             const data1=result;
            leaderboardService.getRankerDetail(data1,(error3,result3)=>{
                if(error3){
                    console.log(error3);
                    return res.send(error);
                }
                return res.render("leaderboard",{result,result2,result3,data:""})
              
            }) 

         
        })
      
    })
}

exports.getAllTimeRanking=(req,res,next)=>{
    leaderboardService.getAllTimeRanking((error,result,result1)=>{
        if(error){
            console.log(error);
            return res.send(error);
        }
        data=result;
        leaderboardService.getAllTimeRankerDetail(data,(error2,result2)=>{
            if(error2){
                console.log(error2);
                return res.send(error2);
            }
            console.log(result2)
            return res.render("leaderboardAllTime",{result,result1,result2})
        }) 
       
    })
}