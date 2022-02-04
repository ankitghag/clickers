const messageService = require("../services/message.service");
const nodemailer = require('nodemailer');

exports.sendMessage=(req,res,next)=>{
    console.log(req)
    const data={
        imgsrc:req.body.imgsrc,
        subject:req.body.subject,
        message:req.body.message,
        userid:req.session.userid,
    }

    messageService.sendMessage(data,(error,result,result1)=>{
        if(error){
            console.log(error);
            return  res.send(error)
        }
        console.log(result)
       if(result.length>0){
            var mail = nodemailer.createTransport({
                service: 'gmail',
                auth: {
              
                    user:'akghag100@gmail.com',
                  pass: process.env.mail_server
                }
              });

              var mailOptions = {
                from: result1[0].Email,
                to: result[0].Email,
                subject: data.subject,
                html:`<div><p>hi you have message from ${result1[0].firstName} ${result1[0].lastName}</p><p>${data.message}</p></div> <!DOCTYPE html>
                        <div><p>Send message to  ${result1[0].firstName} ${result1[0].lastName}</p>
                        <a href="http://localhost:3000/message/reply?replyFrom=${result[0].Email}&replyTo=${result1[0].firstName} ${result1[0].lastName}"><button type="button" name="send" value="send" data-tomail="">Send</button></a>
                        </div>`
              
              };

              mail.sendMail(mailOptions, function(error, info){
                  console.log("running")
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });

                //mial end
        } 
        res.send("hi")

    })
  
}


exports.sendReplyMessage=(req,res,next)=>{
//console.log(req.body.replyTo.trim().split(" "))

 const data={
      replyfrom:req.body.replyfrom,
      replysubject:req.body.replysubject,
      replymessage:req.body.replymessage,
     firstname:req.body.replyTo.trim().split(" ")[0],
     lastname: req.body.replyTo.trim().split(" ")[1]
  } 
console.log(data.firstname)
 // console.log(data)

  messageService.sendReplyMessage(data,(error,result,result1)=>{
    if(error){
      console.log(error);
      res.send(error)
    }
    console.log("------------")
    console.log(result);
    console.log("------------")
 if(result.length>0){
  var mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
  
        user:'akghag100@gmail.com',
      pass: process.env.mail_server
    }
  });

  var mailOptions = {
    from: data.replyfrom,
    to: result[0].Email,
    subject: data.replysubject,
    html:`<div><p>hi you have reply from ${result1[0].firstName} ${result1[0].lastName}</p><p>${data.replymessage}</p></div> <!DOCTYPE html>
            <div><p>Send message to  ${result1[0].firstName} ${result1[0].lastName}</p>
            <a href="http://localhost:3000/message/reply?replyFrom=${result[0].Email}&replyTo=${result1[0].firstName} ${result1[0].lastName}"><button type="button" name="send" value="send" data-tomail="">Send</button></a>
            </div>`
  
  };

  mail.sendMail(mailOptions, function(error, info){
      console.log("running")
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

return res.send("hi")
 }
  })



 
 
}