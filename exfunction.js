app.locals.navauth=false;
  const navAuth= (req,res,next)=>{
   console.log(req.session.isauth);
    
  
     app.locals.navauth=req.session.isauth;
    
   
     next();
  }