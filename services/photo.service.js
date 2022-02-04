const db = require("../db_config");

exports.photoAndDetails=(data,callback)=>{
db.query(`SELECT photo_id,u_id FROM photos WHERE photo_url=?`,
[data.avtarurl],
(error,result,fields)=>{
    if (error) {
        return callback(error);
      }
console.log("running")
   db.query(`SELECT AvatarUrl,firstName,lastName FROM user WHERE u_id=?`,
     [result[0].u_id],
      (error1,result1,field1)=>{
        if (error) {
          return callback(error);
        }
        console.log(result1)
          
       /* db.query(`SELECT photolike FROM likes WHERE photo_id=?`,
       [result[0].photo_id],
       (error2,result2,fileds)=>{
        if (error) {
          console.log("this is error while running like query");
          return callback(error);
        }
        console.log(result2);
        return callback(null,result1,result2)
       }
       ) */

       db.query(`SELECT COUNT(photolikeBy), photo_id
       FROM likes WHERE photo_id=? `,
       [result[0].photo_id],
       (error2,result2,fields)=>{
         if(error2){
           return callback(error2)
         }
        // console.log(result2[0]['COUNT(photolikeBy)'])
         console.log(result2)
         var likestatus="";
         var followstatus="";
          db.query(`SELECT photolikeBy FROM likes WHERE photo_id=? AND photolikeBy=?`,
          [result[0].photo_id,data.userid],
          (error3,result3,fields)=>{
            if(error3){
              console.log(error3);
              return callback(error3)
            }
            if(result3.length>0){
              likestatus="liked";
            }
            else{
              likestatus="notliked";
            }


            db.query(`SELECT follower_id FROM follows WHERE follower_id=? AND following_id=?`,
            [result[0].u_id,data.userid],
            (error4,result4,fields)=>{
              if(error4){
                console.log(error4);
                return callback(error4)
              }
              if(result4.length>0){
                followstatus="followed";
              }
              else{
                followstatus="notfollowed";
              }
              return callback(null,result1,result2,likestatus,followstatus)

            }
            )
           // return callback(null,result1,result2,likestatus)
          }
          )

        // return callback(null,result1,result2)
       }
       )


      }
      )
    
     
}
)}

exports.Cfollower=(data,callback)=>{
    db.query(`SELECT photo_id,u_id FROM photos WHERE photo_url=?`,
    [data.avtarurl],
    (error,result,fields)=>{
        if(error){
          return callback(error)
        }
       
     db.query(`SELECT COUNT(following_id), follower_id
     FROM follows WHERE follower_id=? `,
      [result[0].u_id],
      (error1,result1,fields)=>{
          if(error){
              return callback(error)
           }
    //console.log(result1)
    //return callback(null,result1)
           
         db.query(`SELECT photo_id FROM views WHERE viewBy=? AND photo_id=?`,
         [data.userid,result[0].photo_id],
         (error2,result2,fields)=>{
               if(error){
                     return callback(error)
               }
//console.log(result2)
              if(data.auth==true||data.auth=="true"){
               
                 if(result2.length<1){
  //  console.log(data+"checking for views")
                  console.log(result[0].u_id);
                  console.log(result[0].photo_id);
                  console.log(data.userid);
                  console.log("------------")
                   db.query(`INSERT INTO views (photo_by,photo_id,viewBy) VALUES (?,?,?)`,
                  [result[0].u_id,result[0].photo_id,data.userid],
                   (error3,result3,fields)=>{
                      if(error3){
                        console.log("hi hello2")
                           return callback(error3)
                       }
   
     //console.log("hi hello2")
     console.log(result3)
                     return 
     // return callback(null,"updatefollow")
                     }
                     )
   }
}
    
console.log(result[0].photo_id)
      db.query(`SELECT COUNT(viewBy), photo_id
      FROM views WHERE photo_id=? `,
      [result[0].photo_id],
      (error4,result4,fields)=>{
        if(error4){
         
          return callback(error4)

        }
       console.log(result4);
       console.log("running")
        return callback(null,result1,result4)
      }
      )


    }
    )
  }
  )
}
)

  
}

exports.cfollowing=(data,callback)=>{
  db.query(`SELECT photo_id,u_id FROM photos WHERE photo_url=?`,
  [data.imgsrc],
  (error,result,fields)=>{
    if(error){
      return callback(error);
    }
   console.log(data.followingid);
  db.query(`SELECT follower_id FROM follows WHERE following_id=? AND follower_id=?`,
  [data.followingid,result[0].u_id],
  (error2,result2,fields)=>{
  if(error2){
    return callback(error2)
  }
//console.log(result2);
  if(result2.length>0){
  return callback(null,"followed")
  }

  else{
    db.query(`INSERT INTO follows (follower_id,following_id) VALUES (?,?)`,
    [result[0].u_id,data.followingid],
    (error1,result1,fields)=>{
      if(error){
        return callback(error1)
      }
    //  console.log("this is result1"+result1)
      return callback(null,"updatefollow")
    }
    )
 

  }

}
)

}
)
}