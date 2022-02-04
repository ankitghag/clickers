const db = require("../db_config");

exports.showProfile = (data, callback) => {
    db.query(
      `SELECT firstName,lastName,AvatarUrl FROM user WHERE u_id = ? `,
      [data.userid],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        if (results.length > 0) {
          //console.log(results);
          // return callback(null, "Login success");
          return callback(null, results[0].firstName, results[0].lastName,results[0].AvatarUrl);
  
        } else {
          return callback("Invalid credentials");
        }
      }
    );
  };

  exports.userUploads=(data,callback)=>{
    db.query( `SELECT photo_url,photo_id FROM photos WHERE u_id=?`,
    [data.userid],
    (error,results,fields)=>{
        if (error) {
            return callback(error);
          }
          console.log(results)
          return callback(null,results);
    }
    )
  }