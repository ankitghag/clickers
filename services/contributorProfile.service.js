const db = require("../db_config");

exports.contributorDetails=(data,callback)=>{
    console.log(data)
    db.query(`SELECT firstName,lastName,AvatarUrl,u_id FROM user WHERE firstName=? AND lastName=?`,
    [data.firstname,data.lastname],
    (error,results,fields)=>{
        if (error) {
            return callback(error);
          }
       //  console.log(results[0].firstName)
         db.query( `SELECT photo_url,photo_id FROM photos WHERE u_id=?`,
         [results[0].u_id],
         (error1,results1,fields)=>{
             if (error) {
                 return callback(error);
               }
              console.log(results,results1);
               return callback(null,results[0].firstName,results[0].lastName,results[0].AvatarUrl,results1);
         }
         )
    }
    )
}
/* 
exports.contributorImage=(data1,callback)=>{
    db.query( `SELECT photo_url,photo_id FROM photos WHERE u_id=?`,
    [data1.userid],
    (error,results,fields)=>{
        if (error) {
            return callback(error);
          }
         // console.log(results)
          return callback(null,results);
    }
    )
  } */