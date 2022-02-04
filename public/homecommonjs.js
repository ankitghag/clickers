$(document).ready(()=>{
    $(document).on("click",".displayImage",(event)=>{
   
  
       
        if(event.target.attributes.class.nodeValue=="overlaydownload"){
            var sourceurl=event.target.previousElementSibling.attributes.src.nodeValue;
            window.location.href = `/photo/${sourceurl}` 
        }
        else if(event.target.attributes.class.nodeValue=="subdownloadi"||event.target.attributes.class.nodeValue=="downloadi"||event.target.attributes.class.nodeValue=="downloadicon"){
            var a=$(event.target).parents()[1];
            var sourceurl=a.previousElementSibling.attributes.src.nodeValue;
           // console.log(a);
           // console.log(sourceurl)
            $.post("/download",{downloadimgsrc:sourceurl},(data,status)=>{
               if(status=="success"){
                   console.log("uploaded");
                 var b=sourceurl;
                
                 var linkurl=b.substr(1,);       
                 
                $(`<a href='${linkurl}' id="linkdown" download></a>`).appendTo($(event.target));
              
                var clickdown=$(event.target).children()[0];
                $(clickdown).css("z-index",3)
              
                clickdown.click();
                $("#linkdown").remove();
               }             
               
           })
        }
       
       });
})