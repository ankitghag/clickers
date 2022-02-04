$(document).ready(()=>{
    $(".sendcontainer .send").on("click",()=>{

        if(parseInt($(".messageBoxContainer :input").val().length)!=0){
            var from=$("input[name='replyfrom']").val();
            var subject=$(".subject :input").val();
            var message=$(".messageBoxContainer :input").val();
            var To=$(".rto").text();
     
            $.post("/message/reply",{replyfrom:from,replysubject:subject,replymessage:message,replyTo:To},(data,status)=>{
                if(status=="success"){
                    console.log(data)
                    window.location.href="/contributor/@"+To;
                }
            }) 
        }
      /*   var from=$("input[name='replyfrom']").val();
       var subject=$(".subject :input").val();
       var message=$(".messageBoxContainer :input").val();
       var To=$(".rto").text();

       $.post("/message/reply",{replyfrom:from,replysubject:subject,replymessage:message,replyTo:To},(data,status)=>{
           if(status=="success"){
               console.log(data)
               window.location.href="/contributor/@"+To;
           }
       })  */
    })
})

   /*  $(".send").on("click",()=>{
         
        console.log("click")
        if(parseInt($(".messageBoxContainer :input").val().length)!=0){
            console.log("running")
            var cname=$("#Cname").text()
            var subj=$(".subject :input").val()
            var msg=$(".messageBoxContainer :input").val()
           console.log(msg)
             $.post("/message",{imgsrc:img,subject:subj,message:msg},(data,status)=>{
                console.log(status)
                if(status=="success"){
                    console.log(data);
                    if(data=="notlogged"){
                        window.location.href = `/login`;
                    }
                  $(".MessageFormmain").remove();
                    console.log(data)
    
                }
            }) 
        } */
