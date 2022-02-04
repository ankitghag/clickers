const db = require("../db_config");

exports.getSearchImageTag=(data,callback)=>{
    var tagarr=[];

    for(let i=0;i<data.length;i++){
        console.log(data[i])
        db.query("SELECT tag_name,t_id FROM tags WHERE tag_name LIKE CONCAT('%', ?, '%')",
        [data[i]],
        (error,result,fileds)=>{
            {
                if(error){
                    console.log(error)
                    return callback(error);
                }
                for(let j=0;j<result.length;j++){
                    tagarr.push(result[j].t_id)
                }
                console.log(tagarr)
                console.log("------------tagaarr")

                if(i==data.length-1){
                    return callback(null,tagarr)
                } 
               
            }  

           
        }
        )
    }
   
}

exports.getSearchImage=(data,callback)=>{

    var phototag=[];
   
        db.query("SELECT photo_id FROM photo_tag WHERE t_id IN(?)",
        [data],
        (error1,result1,fileds)=>{
            
                if(error1){
                    console.log(error1);
                    console.log("----------")
                    return callback(error1);
                }
                console.log(result1.length);
                if(result1.length>0){
                    for(let i=0;i<result1.length;i++){
                        phototag.push(result1[i].photo_id)
                        }
             
                        db.query("SELECT photo_url FROM photos WHERE photo_id IN(?)",
                        [phototag],
                        (error2,result2,fields)=>{
                            if(error2){
                                console.log(error2)
                                return callback(error2);
                            }
                            console.log(result2);
                            return callback(null,result2)
        
                        }
                        )

                }
                else{
                    return callback(null,"")
                }
               
           
             

           
        }
        )

 
   
}