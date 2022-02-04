const db = require("../db_config");



exports.likeDetails=(data,callback)=>{
 
    db.query(`SELECT photo_id,u_id FROM photos WHERE photo_url=?`,
    [data.imgsrc],
    (error,result,fields)=>{
      if(error){
        return callback(error);
      }
     console.log(data.likedByid);
    db.query(`SELECT photo_id FROM likes WHERE photolikeBy=? AND photo_id=?`,
    [data.likedByid,result[0].photo_id],
    (error2,result2,fields)=>{
    if(error2){
      return callback(error2)
    }
  //console.log(result2);

    if(result2.length>0){
    return callback(null,"liked")
    }
  
    else{
      console.log(result[0].photo_id)
      console.log(data.likedByid)
      db.query(`INSERT INTO likes (photo_id,photolikeBy) VALUES (?,?)`,
      [result[0].photo_id,data.likedByid],
      (error1,result1,fields)=>{
        if(error){
          console.log(error1)
          return callback(error1)
        }
        console.log(result1)
        console.log("---------")
        return callback(null,"updateLike");
      }
      )
   
  
    }
  
  }
  )
  
  }
  )
  }