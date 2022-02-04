
const uploadService = require("../services/upload.service");
var multer = require("multer");
const path = require("path");
const sharp = require("sharp");
var fs = require('fs');
var fse = require('fs-extra')
var express = require("express");
const nodemailer = require('nodemailer');
var router = express.Router();

const storage = multer.diskStorage({
    destination: './public/allUploadedPhoto/uncategorised',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const uploadphoto = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            // console.log(req)
            console.log('Only .png, .jpg and .jpeg format allowed!')
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
}).single('myfile');

exports.upload = (req, res, next) => {
    const data = {
        userid: req.session.userid,
        userRole: "contributor",
    }

    if (req.session.userRole === "downloader") {
        /*{
            uploadService.upload(data,(err,result)=>{
                if(err){
                    console.log("error in updating or syncing");
                    return res.status(400).send({ success: 0, data: "failded to sync" });
                }
                //req.session.userRole=""
                return res.render("/upload");
                

            })
        }
       // res.redirect("/contributor/Cregister");*/
        res.send("downloader");
    }
    else {
        res.send("contributor");
    }
}

exports.syncupload = (req, res, next) => {
    const data = {
        userid: req.session.userid,
        userRole: req.body.userRole
    }
    uploadService.syncupload(data, (err, result) => {
        if (err) {
            console.log(error);
            return res.status(400).send({ success: 0, data: "Bad request" });
        }
        req.session.userRole = data.userRole;
        return res.send(result);
    })
}

exports.uploadimg = async (req, res, next) => {



    uploadphoto(req, res, async (err) => {
  
        if (err) {
            res.render("upload")
        }
        else {

            var transformer = await sharp("public/allUploadedPhoto/uncategorised/" + req.file.filename).metadata();
            var mp = transformer.width * transformer.height;
           console.log(transformer);
            if (mp < 2000000) {
                fs.unlink("public/allUploadedPhoto/uncategorised/" + req.file.filename, function (err) {
                    if (err) throw err;
                    console.log('File deleted!');
                });
                res.render("upload")
            } else {
                var photosrc;
                var oldpath = req.file.destination + "/" + req.file.filename;
                
                var newpath;
                if (req.body.categories == "" || 'categories' in req.body == false) {
                    photosrc="./allUploadedPhoto/uncategorised/" + req.file.filename
                    newpath = req.file.destination + "/" + req.file.filename;
                }
                else {
                    photosrc="./allUploadedPhoto/"+ req.body.categories + "/" + req.file.filename
                    newpath = "./public/allUploadedPhoto" + "/" + req.body.categories + "/" + req.file.filename
                    fse.move(oldpath, newpath, err => {
                        if (err) return console.error(err)
                        console.log('success!')
                    })
                }
                var tagsJSON="";
                if(req.body.tags==""||req.body.tags.length==0){
                    tagsJSON="";
                    console.log( tagsJSON)
                }
                else{
                    tagsJSON=JSON.parse(req.body.tags);
                if(tagsJSON.length>=5){
                    tagsJSON.splice(5);
                } console.log( tagsJSON)
                }
                console.log( tagsJSON)
             
           
                const data = {
                    photoUrl: photosrc,
                    width: transformer.width,
                    height: transformer.height,
                    u_id: req.session.userid,
                    category: req.body.categories,
                    tags: tagsJSON
                };

/* 
                uploadService.uploadimg(data, (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).send({ success: 0, data: "Bad request" });
                    }

                    return res.send(result);
                }) */

                
                uploadService.uploadimg(data, (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).send({ success: 0, data: "Bad request" });
                    }
                  uploadService.sendmailtoall(data,(error,result1,result2)=>{
                    if (err) {
                        console.log(err);
                        return res.status(400).send({ success: 0, data: "Bad request" });
                    }

                   
                    

                    if(result1=="nofollower"){
                        return res.render("upload");
                    }else{
                               //mail start
                               console.log(result1+"this rseult1");
                               var newf=result1.join(",")
                           console.log(newf)
                           console.log(result2)
                        if(newf.length>0){
                            var mail = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                  user: 'akghag100@gmail.com',
                                  pass: process.env.mail_server
                                }
                              });
        
                              var mailOptions = {
                                from: 'akghag100@gmail.com',
                                to: newf,
                                subject: 'Sending Email via Node.js',
                                text: `${result2[0].firstName} ${result2[0].lastName} has uploaded new photo`,
                                html:`<div><p>Visit the site to view updated images</p></div>
                                        <div><p>${result2[0].firstName} ${result2[0].lastName} has uploaded new photo</p></div>
                                `
                              };
        
                              mail.sendMail(mailOptions, function(error, info){
                                if (error) {
                                  console.log(error);
                                } else {
                                  console.log('Email sent: ' + info.response);
                                }
                              });

                                //mial end
                        }
                        res.render("upload")
                    }
                 
                   
                   
                        
                  
                   
                  })
                   //return res.send(result);
                })

            }
         

        }
    })



}

/*exports.photoupload=(req,res,next)=>{
    const data={

    }
}*/