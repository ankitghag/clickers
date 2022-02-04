const db = require("../db_config");

exports.totaldownload=(data,callback)=>{
    db.query(`SELECT photo_id,u_id FROM photos WHERE photo_url=?`,
    [data.downloadimg],
    (error,result,fields)=>{
        if(error){
            return callback(error)
        }

        console.log(result)
        db.query(`SELECT photo_id,downloaded FROM download WHERE photo_id=?`,
        [result[0].photo_id],
        (error1,result1,fileds)=>{
            if(error1){
                return callback(error1)
            }   

            if(result1.length<1){
                db.query(`INSERT INTO download (photo_id,downloaded) VALUES (?,?)`,
                [result[0].photo_id,1],
                (error2,result2,fields)=>{
                    if(error2){
                        return callback(error2)
                    } 
                    return callback(null,result2)
                }
                )
            }
           
            else{
               // console.log(typeof result[0].downloaded)
                db.query(`UPDATE download
                SET downloaded =? 
                WHERE photo_id = ?`,
                [result1[0].downloaded+1,result[0].photo_id],
                (error3,result3,fields)=>{
                    if(error3){
                        return callback(error3)
                    } 
                    return callback(null,result3)
                }
                )
            }
            
        }
        )
    }
    )
}