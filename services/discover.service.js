const db = require("../db_config");

exports.getCategories=(callback)=>{
    db.query(`SELECT c_id,categories_name FROM categories`,
    (error,result,fields)=>{
        if(error){
            return callback(error)
        }
        var categories=[];
        var categoriesFinal=[];
        for(let i=0;i<result.length;i++){
            categories.push([])
            db.query(`SELECT photo_url,c_id,photoGeneratedOn FROM photos WHERE c_id=? ORDER BY photoGeneratedOn DESC limit 5`,
            [result[i].c_id],
            (error1,result1,fields)=>{
                if(error){
                    return callback(error)
                }
                
                for(let j=0;j<result1.length;j++){
                    categories[i].push(result1[j].photo_url)
                    
                }
                categoriesFinal.push({categoriesName:result[i].categories_name,categoriesPhoto:categories[i]})
              if(i==result.length-1){
                  return callback(null,categoriesFinal)
              }
                
               
         
            
            }
            )
        }
    }
    )
}

exports.getSpecificCategorie=(data,callback)=>{
    db.query(`SELECT c_id FROM categories WHERE categories_name=?`,
    [data.categoriename],
    (error,result,fields)=>{
        if(error){
            return callback(error)
        }
        db.query(`SELECT photo_url FROM photos WHERE c_id=?`,
        [result[0].c_id],
        (error1,result1,fields)=>{
            if(error1){
                return callback(error1)
            }

            return callback(null,result1)
        }
        )
    }
    )
}