const deleteService = require("../services/delete.service");
var express = require("express");
exports.deleteaccount=(req,res,next)=>{
    const data={
        userid:req.session.userid
    }

    console.log("this is data"+data)
    deleteService.deleteaccount(data,(error,result)=>{
        if(error){
            return res.send("bad request");
        }
        req.session.isAuth=false;
        res.status(200).clearCookie('connect.sid', {
            path: '/'
          });
        req.session.destroy((err)=>{
            if(err) throw err;
            console.log(result)
            res.send("deleted")
        })
       
    })

}