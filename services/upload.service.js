const db = require("../db_config");

exports.syncupload = (data, callback) => {
  db.query(
    `UPDATE user SET userRole=? WHERE u_id=?`,
    [data.userRole, data.userid],
    (error, results, fields) => {
      console.log(results);
      if (error) {
        return callback(error);
      }
      console.log(results)
      return callback(null, "suuccessfully sync");
    }
  );
};


//UPDATE `stock`.`user` SET `userRole` = 'downloader' WHERE (`u_id` = '61');

exports.uploadimg = (data, callback) => {

  db.query(`select c_id FROM categories WHERE categories_name=?`,
    [data.category],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }

      if (results.length > 0) {
        console.log(results);
        console.log("this is fields:" + fields)
          db.query(
             `INSERT INTO photos (photo_url, width, height, u_id,c_id) VALUES (?, ?, ?, ?,?)`,
              [data.photoUrl, data.width, data.height, data.u_id, results[0].c_id],
             (error, results, fields) => {

                   if (error) {
                         return callback(error);
                   }
                        //return callback(null,"image uplaoded with data")
                      // var a=JSON.parse(data.tags)
                      var a=data.tags;
                    
                        for(let i=0;i<a.length;i++){
                            db.query(`SELECT tag_name,t_id FROM tags WHERE tag_name=?`,
                            [a[i]["value"]],
                            (error1,results1,fields)=>{
                              if (error1) {
                                db.query(`DELETE FROM photos WHERE photo_url=?`,
                                [data.photoUrl],
                                (error2,results2,fields)=>{
                                    if(error2){
                                      return callback(error2);
                                    }
                                    return callback(error1)
                                }
                                )
                              }
                           
                              if(results1.length<1){
                                console.log("is this run while having same tag")
                                db.query(`INSERT INTO tags (tag_name) VALUES (?)`,
                              [a[i]["value"]],
                              (error3,results3,fields)=>{
                                  if(error3){
                                    db.query(`DELETE FROM photos WHERE photo_url=?`,
                                    [data.photoUrl],
                                    (error4,results4,fields)=>{
                                      if(error4){
                                        return callback(error4)
                                      }
                                      return callback(error3)
                                    }
                                    )
                                    
                                  }
                                  //i++;
                                  //return;
                                  console.log(a)
                                  db.query(`SELECT t_id FROM tags WHERE tag_name=?`,
                                  [a[i]["value"]],
                                  (error5,results5,fields)=>{
                                      if(error5){
                                        db.query(`DELETE FROM photos WHERE photo_url=?`,
                                        [data.photoUrl],
                                        (error6,results6,fields)=>{
                                          if(error6){
                                            return callback(error6)
                                          }
                                            return callback(error5)
                                        }
                                        )
                                      }

                                      db.query(`SELECT photo_id FROM photos WHERE photo_url=?`,
                                      [data.photoUrl],
                                      (error7,results7,fields)=>{
                                        if(error7){
                                          db.query(`DELETE FROM photos WHERE photo_url=?`,
                                          [data.photoUrl],
                                          (error8,results8,fields)=>{
                                            if(error8){
                                              return callback(error8)
                                            }
                                              return callback(error7)
                                          }
                                          )
                                        }

                                        db.query(`INSERT INTO photo_tag (photo_id,t_id) VALUES (?,?)`,
                                        [results7[0].photo_id,results5[0].t_id],
                                        (error9,results9,fields)=>{
                                            if(error9){
                                              db.query(`DELETE FROM photos WHERE photo_url=?`,
                                              [data.photoUrl],
                                              (error10,results10,fileds)=>{
                                                if(error10){
                                                  return callback(error10)
                                                }
                                                  return callback(error9)                                                
                                              }
                                              )
                                            }
                                           // i++;
                                            //return;
                                        }
                                        )
                                      }
                                      )
                                  }
                                  )

                              }
                              )
                              }
                              else{
                                
                                console.log(JSON.stringify(results1)+"this already exist");
                                db.query(`SELECT photo_id FROM photos WHERE photo_url=?`,
                                [data.photoUrl],
                                (errorE,resultsE,fields)=>{
                                  if(errorE){
                                    db.query(`DELETE FROM photos WHERE photo_url=?`,
                                    [data.photoUrl],
                                    (errorE1,resultsE1,fields)=>{
                                      if(errorE2){
                                        return callback(errorE1)
                                      }
                                        return callback(errorE)
                                    }
                                    )
                                  }
                                  db.query(`INSERT INTO photo_tag (photo_id,t_id) VALUES (?,?)`,
                                  [resultsE[0].photo_id,results1[0].t_id],
                                  (errorE2,resultE2,fields)=>{
                                    if(errorE2){
                                      db.query(`DELETE FROM photos WHERE photo_url=?`,
                                      [data.photoUrl],
                                      (errorE3,resultsE3,fileds)=>{
                                        if(errorE3){
                                          return callback(errorE3)
                                        }
                                          return callback(errorE2)                                                
                                      }
                                      )
                                    }


                                  }
                                  )
                                }
                                )
                               // i++;
                              }
                              
                              /* db.query(`INSERT INTO tags (tag_name) VALUES (?)`,
                              [a[i]["value"]],
                              (error3,results3,fields)=>{
                                  if(error3){
                                    db.query(`DELETE FROM photos WHERE photo_url=?`,
                                    [data.photoUrl],
                                    (error4,results4,fields)=>{
                                      if(error4){
                                        return callback(error4)
                                      }
                                      return callback(error3)
                                    }
                                    )
                                    
                                  }
                                  i++;
                                  //return;
                              }
                              ) */

                            } 
                            )
                        }

                        return callback(null,"uploaded");
               })}
            
      else {
        db.query(`INSERT INTO photos (photo_url, width, height, u_id,c_id) VALUES (?, ?, ?, ?,?)`,
          [data.photoUrl, data.width, data.height, data.u_id, 3],
          (error, results, fields) => {
            if (error) {
              return callback(error);
            }
/* here the photo database validation start */
var a=data.tags;
                    
for(let i=0;i<a.length;i++){
    db.query(`SELECT tag_name,t_id FROM tags WHERE tag_name=?`,
    [a[i]["value"]],
    (error1,results1,fields)=>{
      if (error1) {
        db.query(`DELETE FROM photos WHERE photo_url=?`,
        [data.photoUrl],
        (error2,results2,fields)=>{
            if(error2){
              return callback(error2);
            }
            return callback(error1)
        }
        )
      }
      if(results1.length<1){
        db.query(`INSERT INTO tags (tag_name) VALUES (?)`,
      [a[i]["value"]],
      (error3,results3,fields)=>{
          if(error3){
            db.query(`DELETE FROM photos WHERE photo_url=?`,
            [data.photoUrl],
            (error4,results4,fields)=>{
              if(error4){
                return callback(error4)
              }
              return callback(error3)
            }
            )
            
          }
          //i++;
          //return;
          console.log(a)
          db.query(`SELECT t_id FROM tags WHERE tag_name=?`,
          [a[i]["value"]],
          (error5,results5,fields)=>{
              if(error5){
                db.query(`DELETE FROM photos WHERE photo_url=?`,
                [data.photoUrl],
                (error6,results6,fields)=>{
                  if(error6){
                    return callback(error6)
                  }
                    return callback(error5)
                }
                )
              }

              db.query(`SELECT photo_id FROM photos WHERE photo_url=?`,
              [data.photoUrl],
              (error7,results7,fields)=>{
                if(error7){
                  db.query(`DELETE FROM photos WHERE photo_url=?`,
                  [data.photoUrl],
                  (error8,results8,fields)=>{
                    if(error8){
                      return callback(error8)
                    }
                      return callback(error7)
                  }
                  )
                }

                db.query(`INSERT INTO photo_tag (photo_id,t_id) VALUES (?,?)`,
                [results7[0].photo_id,results5[0].t_id],
                (error9,results9,fields)=>{
                    if(error9){
                      db.query(`DELETE FROM photos WHERE photo_url=?`,
                      [data.photoUrl],
                      (error10,results10,fileds)=>{
                        if(error10){
                          return callback(error10)
                        }
                          return callback(error9)                                                
                      }
                      )
                    }
                   // i++;
                    //return;
                }
                )
              }
              )
          }
          )

      }
      )
      }
      else{
        
        console.log(JSON.stringify(results1)+"this already exist without categories");
        db.query(`SELECT photo_id FROM photos WHERE photo_url=?`,
        [data.photoUrl],
        (errorE,resultsE,fields)=>{
          if(errorE){
            db.query(`DELETE FROM photos WHERE photo_url=?`,
            [data.photoUrl],
            (errorE1,resultsE1,fields)=>{
              if(errorE2){
                return callback(errorE1)
              }
                return callback(errorE)
            }
            )
          }
          db.query(`INSERT INTO photo_tag (photo_id,t_id) VALUES (?,?)`,
          [resultsE[0].photo_id,results1[0].t_id],
          (errorE2,resultE2,fields)=>{
            if(errorE2){
              db.query(`DELETE FROM photos WHERE photo_url=?`,
              [data.photoUrl],
              (errorE3,resultsE3,fileds)=>{
                if(errorE3){
                  return callback(errorE3)
                }
                  return callback(errorE2)                                                
              }
              )
            }


          }
          )
        }
        )



        //i++;
      }
      
      /* db.query(`INSERT INTO tags (tag_name) VALUES (?)`,
      [a[i]["value"]],
      (error3,results3,fields)=>{
          if(error3){
            db.query(`DELETE FROM photos WHERE photo_url=?`,
            [data.photoUrl],
            (error4,results4,fields)=>{
              if(error4){
                return callback(error4)
              }
              return callback(error3)
            }
            )
            
          }
          i++;
          //return;
      }
      ) */

    } 
    )
}
/* here the photo database validation start */




            return callback(null, "c_id is empty so add as uncategories");
          })
        // return callback(null, "c_id is empty");
      }
    }

  )



};
  /* exports.uploadimg=(data,callback)=>{
var a=JSON.parse(data.tags)
for(i=0;i<a.length;i++){
  db.query(`INSERT INTO tags (tag_name) VALUES (?)`,
  [a[0].value],
  (error, results, fields)=>{
    if (error) {
      return callback(error);
    }
  })
}

}   */

exports.sendmailtoall= (data,callback)=>{
//  var followingEmail=[];
db.query(`SELECT firstName,lastName FROM user WHERE u_id=?`,
[data.u_id],
(error,result,field)=>{
  if (error) {
    return callback(error);
  }

  db.query(`SELECT following_id FROM follows WHERE follower_id=?`,
    [data.u_id],
     (errorE,resultE,fileds)=>{
      if (errorE) {
        return callback(errorE);
      }
      if(resultE.length>0){
        console.log(resultE)
        console.log(resultE.length)
        var followingEmail=[];
        var name=[];
      for(let i=0;i<resultE.length;i++){
          db.query(`SELECT Email,firstName,lastName FROM user WHERE u_id=?`,       
          [resultE[i].following_id],
          (error1,result1,fields)=>{
            if (error1) {
              return callback(error1);
            }
          else if(result1.length>0){  followingEmail.push(result1[0].Email)}
          
           
           console.log("hi")
            if(i==resultE.length-1){
             
              return callback(null,followingEmail,result)
            }
          })
          
        }
      }
      else{
        return callback(null,"nofollower",result)
      }
    
     
    
    }
    )

}
)
 
}