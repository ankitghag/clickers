const db = require("../db_config");

exports.sendMessage=(data,callback)=>{
    db.query(`SELECT u_id FROM photos WHERE photo_url=?`,
    [data.imgsrc],
    (error,result,fields)=>{
        if(error){
            return callback(error)
        }

        db.query(`SELECT Email FROM user WHERE u_id=?`,
        [result[0].u_id],
        (error1,result1,fields)=>{
            if(error1){
                return callback(error1)
            }

            db.query(`SELECT Email,firstName,lastName FROM user WHERE u_id=?`,
            [data.userid],
            (error2,result2,fields)=>{
                if(error2){
                    return callback(error2)
                }
                return callback(null,result1,result2)
               
                
            }
            )
            
        }
        )

    }
    )
}

exports.sendReplyMessage=(data,callback)=>{
    db.query(`SELECT Email FROM user WHERE firstName=? AND lastName=?`,
    [data.firstname,data.lastname],
    (error,result,fields)=>{
        if(error){
            return callback(error)
        }
        db.query(`SELECT firstName,lastName FROM user WHERE Email=?`,
        [data.replyfrom],
        (error1,result1,fields)=>{
            if(error1){
                return callback(error1)
            }
            return callback(null,result,result1)
        }
        )
    }
    )
}