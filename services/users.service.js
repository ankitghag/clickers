const db = require("../db_config");
const bcrypt=require('bcryptjs');

exports.register = (data, callback) => {
  db.query('SELECT Email FROM user WHERE Email=?',
  [data.emailId],
  (error,results,fields)=>{
    if(error){
      return callback(error);
    }

    if(results.length==0){
      db.query(
        `INSERT INTO user (firstName, lastName, Email, Password,userRole) VALUES (?, ?, ?, ?,?)`,
        [data.firstName, data.lastName, data.emailId, data.password,"downloader"],
        (error, results, fields) => {
          if (error) {
            return callback(error);
          }
          return callback(null, `Registration successful`);
        }
      );

    }

    else{
      return callback("email has already registered by someone")

    }
  }
  )
};
  /*db.query(
    `INSERT INTO user (firstName, lastName, Email, Password,userRole) VALUES (?, ?, ?, ?,?)`,
    [data.firstName, data.lastName, data.emailId, data.password,"downloader"],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, `Registration successful`);
    }
  );*/


// contributor signup
exports.cregister = (data, callback) => {
  db.query('SELECT Email FROM user WHERE Email=?',
  [data.emailId],
  (error,results,fields)=>{
    if(error){
      return callback(error);
    }

    if(results.length==0){
      db.query(
        `INSERT INTO user (firstName, lastName, Email, Password,userRole) VALUES (?, ?, ?, ?,?)`,
        [data.firstName, data.lastName, data.emailId, data.password,"contributor"],
        (error, results, fields) => {
          if (error) {
            return callback(error);
          }
          return callback(null, `Registration successful`);
        }
      );
    }
    else{
      return callback("email has already registered by someone")
    }})};

  /*db.query(
    `INSERT INTO user (firstName, lastName, Email, Password,userRole) VALUES (?, ?, ?, ?,?)`,
    [data.firstName, data.lastName, data.emailId, data.password,"contributor"],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, `Registration successful`);
    }
  );*/








exports.login = async (data, callback) => {
db.query('SELECT Password FROM user WHERE Email=?',
[data.emailId],
async (error,results,fields)=>{
  if(error){
    console.log("error in selection ")
    return callback(error);
  }

  if(results.length>0){
    if(await bcrypt.compare(data.password,results[0].Password)){

      db.query(
        `SELECT u_id,userRole FROM user WHERE Email = ? `,
        [data.emailId],
       (error, results, fields) => {
          if (error) {
          return  callback(error);
          }
          if (results.length > 0) {
            console.log(results);
           // return callback(null, "Login success");
         return  callback(null, results[0].u_id,results[0].userRole);
    
          } else {
          return  callback("Invalid credentials");
          }
        }
      );

    }
    else{
      return callback("wrong password");
    }
  }
  else {
    return  callback("Invalid credentials");
  }
})
};

 /*db.query(
    `SELECT u_id,userRole FROM user WHERE Email = ? AND Password = ?`,
    [data.emailId, data.password],
   (error, results, fields) => {
      if (error) {
      return  callback(error);
      }
      if (results.length > 0) {
        console.log(results);
       // return callback(null, "Login success");
     return  callback(null, results[0].u_id,results[0].userRole);

      } else {
      return  callback("Invalid credentials");
      }
    }
  );*/


exports.forgetPassword=(data,callback)=>{
  db.query(`SELECT Email,u_id,Password FROM user WHERE Email=?`,
  [data.email],
  (error,results,fields)=>{
    if(error){
      return callback(error);
    }

    if(results.length>0){
      console.log("this emailid match in db :"+results[0].Email);
      return callback(null,results);
    }
    else{
      return callback("email is not register");
    }
  })
}

exports.chkresetPassword=(data,callback)=>{
db.query(`SELECT u_id,Password FROM user WHERE u_id=?`,
[data.id],
(error,results,feilds)=>{
  if(error){
    return callback(error);
  }
  if(results.length>0){
    return callback(null,results)
  }
  else{
    return callback("user not register .Invalid u_id")
  }
}
)
}

exports.resetPassword=(data,callback)=>{
  db.query(`UPDATE user SET Password=? WHERE u_id=? AND Email=?`,
  [data.password,data.id,data.email],
  (error,results,fields)=>{
    if(error){
      return callback(error)
    }

    if(results.affectedRows>0){
      return callback(null,"successfully reset passowrd")
    }
    else{
      return callback("there no email or uid found while updating password")
    }
  }
  )
}