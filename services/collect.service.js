const db = require("../db_config");

exports.getCollection=(data,callback)=>{
    db.query(`SELECT collectionName FROM collection WHERE u_id=?`,
    [data.userid],
    (error,result,fields)=>{
        if(error){
            console.log(error);
            return callback(error)
        }
        console.log(result)
        console.log("this is result")
        return callback(null,result)
    }    
    )
}

exports.postExistCollection=(data,callback)=>{
    db.query(`SELECT collection_id FROM collection WHERE collectionName=? AND u_id=?`,
    [data.collectionName,data.userid],
    (error,result,fileds)=>{
        if(error){
            return callback(error)
        }
        db.query(`SELECT photo_id FROM photos WHERE photo_url=?`,
        [data.imgsrc],
        (error1,result1,fileds)=>{
            if(error1){
                return callback(error1)
            }
            db.query(`INSERT INTO collection_tag(collection_id,p_id) VALUES (?,?)`,
            [result[0].collection_id,result1[0].photo_id],
            (error3,result3,fields)=>{
                if(error3){
                    return callback(error3)
                }
                return callback(null,result3)
            })
        }
        )
    }
    )
}

exports.postNewCollection=(data,callback)=>{
    db.query(`SELECT collectionName FROM collection WHERE collectionName=?`,
    [data.title],
    (error,result,fields)=>{
        if(error){
            return callback(error)
        }
        if(result.length<1){
            db.query(`INSERT INTO collection(collectionName,u_id) VALUES (?,?)`,
            [data.title,data.userid],
            (error1,result1,fileds)=>{
                if(error1){
                    return callback(error1)
                }

                db.query(`SELECT collection_id FROM collection WHERE collectionName=? AND u_id=?`,
                [data.title,data.userid],
                (error2,result2,fileds)=>{
                    if(error2){
                        return callback(error2)
                    }
                    db.query(`SELECT photo_id FROM photos WHERE photo_url=?`,
                    [data.imgsrc],
                    (error3,result3,fileds)=>{
                        if(error3){
                            return callback(error3)
                        }

                        db.query(`INSERT INTO collection_tag(collection_id,p_id) VALUES (?,?)`,
                        [result2[0].collection_id,result3[0].photo_id],
                        (error4,result4,fields)=>{
                            if(error4){
                                return callback(error4)
                            }
                            return callback(null,result4)
                        })
                        
                    }
                    )
                }
                )
           
            }
            )
        }
        else{
            return callback(null,"this title is already taken")
        }
    }
    )
}

exports.getuserCollection=(data,callback)=>{
    db.query(`SELECT collection_id,collectionName FROM collection WHERE u_id=?`,
    [data.userid],
    (error,result,fileds)=>{
        if(error){
            return callback(error)
        }
      //  console.log(result)
        if(result.length>0){
            var coll=[];
            var Collections=[];
            for(let i=0;i<result.length;i++){
                coll.push([])
               
           //  console.log(result.length)
                db.query("SELECT p_id FROM collection_tag WHERE collection_id=?",
                [result[i].collection_id],
                (error1,result1,fileds)=>{
                    if(error1){
                        console.log("the error1 is reunning")
                        return callback(error1)
                    }
                 /*    console.log(i)
                   console.log(result.length)
                   console.log(result1.length) */
                    for(let j=0;j<result1.length;j++){
                       
                        db.query("SELECT photo_url FROM photos WHERE photo_id=?",
                        [result1[j].p_id],
                        (error2,result2,fileds)=>{
                            if(error2){
                                return callback(error2)
                            }
                           
                          
                            coll[i].push(result2[0].photo_url)
                           
                        if(j==result1.length-1){
                            if(i==result.length-1){
                              console.log("this is running")
                                return callback(null,result,coll);
                            }
    
                        }
                           
                        }
                        )
                    }
                   
                 
                }
                )
            }
        }
        else{
            return callback(null,"nocollection","nophoto")
        }
    }
    )
}


exports.specificCollection=(data,callback)=>{
    var coll=[];
    
    db.query(`SELECT collection_id FROM collection WHERE collectionName=? AND u_id=?`,
    [data.Cname,data.userid],
    (error,result,fileds)=>{
        if(error){
            return callback(error)
        }
        
        if(result.length>0){
            db.query(`SELECT p_id FROM collection_tag WHERE collection_id=?`,
            [result[0].collection_id],
            (error1,result1,fileds)=>{
                if(error1){
                    return callback(error1)
                }
               console.log(result1)
                for(let j=0;j<result1.length;j++){
                    //  
                      db.query("SELECT photo_url FROM photos WHERE photo_id=?",
                      [result1[j].p_id],
                      (error2,result2,fileds)=>{
                          if(error2){
                              return callback(error2)
                          }
                        // console.log(result2)
                        
                          coll.push(result2[0].photo_url)
                        //  console.log(coll);
                       // console.log(i)
                          if(j==result1.length-1){
                              
                              return callback(null,coll)
                          }
  
                      }
                      )
                  }
            }
            )
        }
    }
    )
}