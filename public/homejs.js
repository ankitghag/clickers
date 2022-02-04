$(document).ready(()=>{
    var a=30;
    var flag=0;
   /*  $(`<div class="overlaydownload"><h1>down</h1></div>`).appendTo(".displayImage") */
   $("#searchbar").css("display","none");
   $("#navCont").css("background","transparent");
$(window).scroll(()=>{
   
    var top=window.scrollY;

    if(top<255){
        $("#searchbar").css("display","none")
        $("#navCont").css("background","transparent");
    }
    else{
        $("#searchbar").css("display","flex");
        $("#navCont").css("background","black");
    }
});

$("#loadmore").on("click",(e)=>{
    if(flag==0){
        $.post("/home/loadmoreImage",{startFrom:a},(data,status)=>{
            if(data.length<1){
                $(".message").css("display","block");
             $(".message").html("no more images are present");
             flag=1;
            }
            else{
                if(status=="success"){
                    a+=30;
                    console.log(a);
                    for(var i=0;i<data.length;i++){
                          $(`<div class="displayImage">
                        <img src='${data[i].photo_url}'><div class="overlaydownload"><div class="downloadi">
                        <img src="./icons/downloadicon.png">
                        <div class="subdownloadi"></div>
                    </div></div>
                        </div>`).appendTo("#image-display-container")  
                         

                    }
                }
            }

        })
}

    
});

/* $(".displayImage").on("click",(event)=>{
   
  console.log(event.target)
  console.log(event.target.attributes.class.nodeValue)
   // console.log(event.target.previousElementSibling)
    var sourceurl=event.target.previousElementSibling.attributes.src.nodeValue;
   // console.log(sourceurl)
     // window.location.href = `/photo/${sourceurl}` 
 });
 */



/* $(".downloadi").on("click",(event)=>{
    
    event.stopPropagation();
   // console.log($(event.target).parents()[1])
   
       var a=$(event.target).parents()[1];
       var sourceurl=a.previousElementSibling.attributes.src.nodeValue;
       
       $.post("/download",{downloadimgsrc:sourceurl},(data,status)=>{
          if(status=="success"){
              console.log("uploaded");
            var b=sourceurl;
           
            var linkurl=b.substr(1,);       
            
           $(`<a href='${linkurl}' id="linkdown" download></a>`).appendTo($(event.target));
         
           var clickdown=$(event.target).children()[0];
           $(clickdown).css("z-index",3)
           console.log(clickdown)
           clickdown.click();
           $("#linkdown").remove();
          }             
          
      })
 }); */
    	
//new function
$(document).on("click",".displayImage",(event)=>{
   
    console.log(event.target)
    console.log(event.target.attributes.class.nodeValue)
    if(event.target.attributes.class.nodeValue=="overlaydownload"){
        var sourceurl=event.target.previousElementSibling.attributes.src.nodeValue;
        window.location.href = `/photo/${sourceurl}` 
      
    }
    else if(event.target.attributes.class.nodeValue=="subdownloadi"||event.target.attributes.class.nodeValue=="downloadi"||event.target.attributes.class.nodeValue=="downloadicon"){
        var a=$(event.target).parents()[1];
        var sourceurl=a.previousElementSibling.attributes.src.nodeValue;
        console.log(a);
        console.log(sourceurl)
        $.post("/download",{downloadimgsrc:sourceurl},(data,status)=>{
           if(status=="success"){
               console.log("uploaded");
             var b=sourceurl;
            
             var linkurl=b.substr(1,);       
             
            $(`<a href='${linkurl}' id="linkdown" download></a>`).appendTo($(event.target));
          
            var clickdown=$(event.target).children()[0];
            $(clickdown).css("z-index",3)
           // console.log(clickdown)
            clickdown.click();
            $("#linkdown").remove();
           }             
           
       })
    }
   
   });


 
//end of new function
})

