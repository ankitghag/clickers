$(document).ready(()=>{
    $(".follow :button").on("click",(e)=>{
        //console.log(e.target);
       // console.log($(location).attr('href'))
     var likedimg= "."+$("#presentPhoto img").attr("src");
         $.post("/photo/follow",{likedimgsrc:likedimg},(data,status)=>{
            if(status=="success"){ 
                console.log(data)
                $("#Cfollower").html();
                if(data=="notlogged"){
                    window.location.href = `/login`
                }
               else if(data=="updatefollow"){
                var a=  parseInt($("#Cfollower").html())+1 
                $("#Cfollower").html(a+" "+"followers");
                $(".follow :button").html("followed")
                }
            } 
        
        })
    })

    $(".likes :button").on("click",()=>{
        var likedimg= "."+$("#presentPhoto img").attr("src");
        $.post("/like",{likedimgsrc:likedimg},(data,status)=>{
            console.log(status)
            if(status=="success"){
                console.log(data);
                if(data=="notlogged"){
                    window.location.href = `/login`;
                }
                else if(data=="updateLike"){
                var a= parseInt( $("#lnum").html())+1;
               $("#lnum").html(a);
               $(".likes :button").css({"background":"red","color":"white"})
                }
            }
        })
    })

    $(".download a").on("click",()=>{
        console.log("running")
        var downloadimg= "."+$("#presentPhoto img").attr("src");
        $.post("/download",{downloadimgsrc:downloadimg},(data,status)=>{
            if(status=="success"){
                console.log(data);
            }
        })
    })

    $(".collectmain :button").on("click",()=>{
        var imgCollect= "."+$("#presentPhoto img").attr("src");
        console.log(imgCollect)
        $(`<div class="collectFormmain">
        <div class="collectForm" tabindex="0">
        <form action="/collect?imgSrc=${imgCollect}" method="post" id="newcollectionform">
        <button class="createnewCollection" name="newcollection" value="new Collection">new collection</button>
       <div class="TitleDiv"> <label for="title"><b>Title</b></label><input type="text" name="title" id="title" placeholder="Enter Title For Your Collection"></div>
      
       <div class="userCollectionsmain"></div>
       <div class="selectCollectionsmain"></div>
       <button type="submit" value="submit" name="submitbtn">submit</button>
       <button type="reset" value="cancel" name="cancel">cancel</button>
        </form>
        </div>
       
        <div class="closebtn"><div class="closemessage"><img src="./icons/cancelicon.png"><div class="messagecloseoverlay"></div></div></div>
        </div>`).appendTo("body")
        $(".collectForm").focus();
        $(".collectForm").css("display","block")

     

        $.get("/collect",(data,status)=>{
            if(status="sucess"){
                console.log(data)
            }

            if(data.length<1){
                $(".userCollectionsmain").css("display","block")
                $(".userCollectionsmain").html("you don't have any collection , create new collection");
                $(".createnewCollection").css("background","red");
            }
            else{
                $(".userCollectionsmain").css("display","none");
                $(".selectCollectionsmain").css("display","flex");
                $(".selectCollectionsmain").css("border","2px solid red")
                $(`<div class="radioTitle"><p>Select From Your Collection : </p></div>`).appendTo(".selectCollectionsmain")
                for(let i=0;i<data.length;i++){
                    $(`<input type="radio" id=${data[i].collectionName} name="collectionName" value=${data[i].collectionName}>
                    <label for=${data[i].collectionName}>${data[i].collectionName}</label>`).appendTo(".selectCollectionsmain")
               }

            }

            $(".selectCollectionsmain").on("click",(event)=>{
               // console.log(event.target)
                $(".selectCollectionsmain label").css("background","rgba(212, 206, 206, 0.4)");
               
            var a= $('input[type=radio]:checked').val();
            
             console.log( $(".selectCollectionsmain label[for="+a+"]").css("background","rgba(212, 206, 206, 0.9)"))
              //  console.log( $('input[type=radio]:checked').val());
             
            })
            
        })

        $(".collectForm form .createnewCollection").on("click",(event)=>{
            event.preventDefault();
            $(".collectForm").focus();
            $(".TitleDiv").toggle(()=>{
                $('input[name=title]').val("");
              
            });

            $(".selectCollectionsmain").toggle(()=>{
                $(".selectCollectionsmain label").css("background","rgba(212, 206, 206, 0.4)");
                $('input[name="collectionName"]').prop('checked',false);
            });
        })
          
        $("#newcollectionform button[type='reset']").on("click",()=>{
            $(".selectCollectionsmain label").css("background","rgba(212, 206, 206, 0.4)");
            $('input[name="collectionName"]').prop('checked',false);
        })
      
      
       /*  $("form button[type='submit']").on("click",()=>{
            $.post("/collect",{imgCollection:imgCollect},(data1,status1)=>{
                 if(status1=="success"){
                 console.log(data)
                 }
             })
        })  */

        $(".closebtn").on("click",()=>{
            $(".collectFormmain").css("display","none")
        })

    })

    $(".messageC :button").on("click",()=>{
        var img= "."+$("#presentPhoto img").attr("src");

        var toName=$("#Cname").html();
        console.log(toName)
       
        $(`<div class="MessageFormmain">
        <div class="messageboxMainContainer">
            <div class="msgtitle">New Message</div>
             <div class="to">TO : ${toName}</div>
             <form id="messageForm">
                 <div class="subject"><textarea placeholder="subject"></textarea></div>
                 <div class="messageBoxContainer"><textarea></textarea></div>
             <form>
             <div class="sendcontainer"><div class="send">Send</div></div>
        </div>
        <div class="closebtn"><div class="closemessage"><img src="./icons/cancelicon.png"><div class="messagecloseoverlay"></div></div></div>
      </div>`).appendTo("body")
    
     
          
    
      
     
  
     
        $(".send").on("click",()=>{
         
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
            }
              
           
        })
    
    
       
        
       

        $(".closebtn").on("click",()=>{
            $(".MessageFormmain").css("display","none")
        })
    })

    $(".maincloseoverlay").on("click",(event)=>{
        window.history.back();
    })


})


