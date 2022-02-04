const db = require("../db_config");

exports.deleteaccount=(data,callback)=>{
    console.log(data.userid)
    db.query(`DELETE FROM user WHERE u_id = ?`,
    [data.userid],
    (error,result,field)=>{
        if(error){
            console.log(error)
            return callback(error)
        }
        console.log("this is run")
        return callback(null,result)
    }
    )
}