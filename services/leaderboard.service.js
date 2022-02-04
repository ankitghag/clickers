const db = require("../db_config");


/*  exports.getRanking=(callback)=>{
db.query(`SELECT photo_by,photo_id,sum(totalviewscount) as totalviews 
FROM (
    SELECT  photo_by,photo_id,count(viewBy) as totalviewscount,viewon FROM views WHERE viewon BETWEEN DATE_SUB(CURDATE(), INTERVAL 3 DAY) AND CURDATE() Group By photo_id
) as t
GROUP BY photo_by order by totalviews DESc`,
(error,result,fields)=>{
    if(error){
        return callback(error)
    }
    db.query(`SELECT  photo_by,photo_id,count(viewBy) as totalviewscount,viewon FROM views WHERE viewon BETWEEN DATE_SUB(CURDATE(), INTERVAL 3 DAY) AND CURDATE() Group By photo_id`,
   (error1,result1,fields)=>{
    if(error1){
        return callback(error1)
    }
   // console.log(result,result1)
    return callback(null,result,result1)

   }
    )
    //return callback(null,result)
}
)
} */ 

exports.getRanking=(callback)=>{
    db.query(`SELECT photo_by,photo_id,sum(totalviewscount) as totalviews 
    FROM (
        SELECT  photo_by,photo_id,count(viewBy) as totalviewscount,viewon FROM views WHERE viewon BETWEEN DATE_SUB(CURDATE(), INTERVAL 3 DAY) AND CURDATE() Group By photo_id
    ) as t
    GROUP BY photo_by order by totalviews DESc`,
    (error,result,fields)=>{
        if(error){
            return callback(error)
        }
      
        return callback(null,result)
    }
    )
    }

exports.getRankerImageDetail=(data,callback)=>{
    var a=[];
  
   for(let i=0;i<data.length;i++){
        db.query(`SELECT photo_url,photo_id,u_id FROM photos WHERE u_id=? limit 6`,
        [data[i].photo_by],
        (error3,result3,fields)=>{
            if(error3){
                return callback(error3)
            }
            console.log(result3,i)
            a.push(result3);
            if(i==data.length-1){
                return callback(null,a)
            }
            
        }
        )
    } //for loop
   // return callback(null,"hi")
}


 exports.getRankerDetail=(data,callback)=>{
    var b=[];
   // console.log(data.length)
   // console.log(data)
   for(let i=0;i<data.length;i++){
        db.query(`SELECT firstName,lastName,AvatarUrl FROM user WHERE u_id=?`,
        [data[i].photo_by],
        (error4,result4,fields)=>{
            if(error4){
                return callback(error4)
            }
      //      console.log(result4)
      //      console.log(i)
        b.push(result4);
            if(i==data.length-1){
                return callback(null,b)
            }
            
        }
        )
    } //for loop
   // return callback(null,"hi")
} 



exports.getAllTimeRanking=(callback)=>{
    db.query(`SELECT photo_by,photo_id,count(viewBy) as totalviews 
    FROM views  
    GROUP BY photo_by order by totalviews DESc`,
    (error,result,fields)=>{
        if(error){
            return callback(error)
        }

        var imageurl=[];
        for(let i=0;i<result.length;i++){
            db.query(`SELECT photo_url,photo_id,u_id FROM photos WHERE u_id=? limit 6`,
            [result[i].photo_by],
            (error3,result3,fields)=>{
                if(error3){
                    return callback(error3)
                }
               // console.log(result3,i)
                imageurl.push(result3);
                if(i==result.length-1){
                    return callback(null,result,imageurl)
                }
                
            }
            )
        }

      
       // return callback(null,result)
    }
    )
    } 

    
 exports.getAllTimeRankerDetail=(data,callback)=>{
    var b=[];
   // console.log(data.length)
   // console.log(data)
   for(let i=0;i<data.length;i++){
        db.query(`SELECT firstName,lastName,AvatarUrl FROM user WHERE u_id=?`,
        [data[i].photo_by],
        (error4,result4,fields)=>{
            if(error4){
                return callback(error4)
            }
      //      console.log(result4)
      //      console.log(i)
        b.push(result4);
            if(i==data.length-1){
                return callback(null,b)
            }
            
        }
        )
    } //for loop
   // return callback(null,"hi")
} 