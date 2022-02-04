const db = require("../db_config");

exports.getImages=(callback)=>{
    db.query( `SELECT photo_url,photo_id FROM photos ORDER BY photo_id LIMIT 30  `,
    (error,results,fields)=>{
        if (error) {
            return callback(error);
          }
         // console.log(results)
          return callback(null,results);
    }
    )
}

exports.getMoreImages=(data,callback)=>{
    db.query( `SELECT photo_url,photo_id FROM photos  LIMIT 30  OFFSET ?`,
    [data.start],
    (error,results,fields)=>{
        if (error) {
            return callback(error);
          }
         // console.log(results)
          return callback(null,results);
    }
    )
}