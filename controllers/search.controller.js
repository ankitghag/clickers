const searchService = require("../services/search.service");

exports.getSearchImage=(req,res,next)=>{
  var a=req.query.searchbar;
 // a = a.replace(/\s\s+/g, ' ');
 console.log(a);
  //var queryarr=a.split(/\W\W*/gi );
  var queryarr=a.split(/[^A-z][^A-z]*/gi );
console.log(queryarr);

 searchService.getSearchImageTag(queryarr,(error,result)=>{
   console.log(result)
console.log(result.length)
if(result.length>0){
  searchService.getSearchImage(result,(error,result1)=>{
    console.log(result1.length+"this is what you want");
    if(result1.length>0){
      res.render("search",{imgsrc:result1,title:req.query.searchbar})
    }
    else{
      res.render("search",{imgsrc:"",title:"No such photos for "+a})

    }
  
   }
   )  
}
else{
  res.render("search",{imgsrc:"",title:"No such photos for "+a})
}
   
 })
 
}