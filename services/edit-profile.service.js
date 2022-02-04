const db = require("../db_config");
const bcrypt=require('bcryptjs');
exports.editprofile = (data, callback) => {
  db.query(
    `SELECT firstName,lastName,Email,AvatarUrl FROM user WHERE u_id = ? `,
    [data.userid],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      if (results.length > 0) {
        //console.log(results);
        // return callback(null, "Login success");
        return callback(null, results[0].firstName, results[0].lastName, results[0].Email,results[0].AvatarUrl);

      } else {
        return callback("Invalid credentials");
      }
    }
  );
};

exports.updateProfile=(data1,callback)=>{
  db.query(`SELECT AvatarUrl FROM user WHERE u_id = ?`,
  [data1.userId],
  (err,results,fields)=>{
    if(err){
      return callback(err)
    }
    return callback(null,results)
  }
  )}

exports.updateProfile1=(data,callback)=>{
  

  db.query(`UPDATE user SET firstName=?,lastName=?,Email=?,AvatarUrl=? where u_id=?`,
  [data.firstName,data.lastName,data.Email,data.AvatarUrl,data.userid],
  (error,result,fields)=>{
    if(error){
      
      return callback(error);
    }

    return callback(null,result);
  }
  )
}



exports.changePassword = async (data, callback) => {
  
  db.query(`SELECT Password FROM user WHERE u_id=? `,
    [data.userid],
   async  (error, results, feilds) => {
      if (error) {
        return callback(error);
      }
    
      else if (results.length > 0) {
       // if (data.currentPassword == results[0].Password)
        if(await bcrypt.compare(data.currentPassword,results[0].Password))
         {
          console.log("hello");
          db.query(
            `UPDATE user SET Password=? where u_id=? `,
            [data.newPassword, data.userid],
            (error, results, fields) => {
              if (error) {
                
                return callback(error);
              }
              if (results.affectedRows > 0) {
                //console.log(results);
                // return callback(null, "Login success");
                console.log(results.affectedRows);
                console.log(results);
                return callback(null, "updated successfuly");

              } else {
                return callback("Invalid credentials");
              }
            }
          );
        }
        else{
          return callback("password incoreect")
        }


      }

      else {
        return callback("invalid credential");
      }
    })
}







/*exports.changePassword = (data, callback) => {
  db.query(
    `UPDATE user SET Password=? where u_id=? `,
    [data.newPassword, data.userid],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      if (results.affectedRows > 0) {
        //console.log(results);
        // return callback(null, "Login success");
        console.log(results.affectedRows);
        console.log(results);
        return callback(null, "updated successfuly");

      } else {
        return callback("Invalid credentials");
      }
    }
  );
};*/

/*exports.checkPassword=(data)=>{
  return new Promise((resolve,reject)=>{
    db.query(`SELECT Password FROM user WHERE u_id=?`,
    [data.userid],(error,results,fields)=>{
      if(error){
        return reject(error);
      }
      resolve(results);
    }

    );
  });
}*/