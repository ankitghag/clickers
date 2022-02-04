$(document).ready(()=>{

    $(".totalimg").on("click",()=>{
        $("#image-display-container").css("display","block")
        $("#collectionDisplay").empty();
        $("#collectionDisplay").css("display","none");
        $(".totalimg").css("color","blue");
        $(".collections").css("color","black");

    })

    $(".collections").on("click",()=>{
        $(".collections").css("color","blue");
        $(".totalimg").css("color","black");
        $("#collectionDisplay").css("display","flex")
        $.get("/collect/usercollection",(data,status)=>{
           var newarr=[];
             console.log(data)
              if(status=="success"){
                 if(data=="NoCollection"){
                    $(`<div><p>You Dont Have Any Collection</p></div>`).appendTo("#collectionDisplay")
                 }

                 else{
                    for(let i=0;i<data.collectionName.length;i++){
                        newarr.push(data.collectionPhotos[i].slice(0,4));
                    }
                 
                  
         
                     for(let i=0;i<data.collectionName.length;i++){
                    $(`<div class="collectionContainermain">
                    <div class="collectionContainer">
                    <div class="collectionBig"> <div class="collectionBigimg"><img src='${data.collectionPhotos[i][0]}'></div></div>
                    <div class="collectionSmall"> 
                   
                    </div>
                     </div>
                     <div class="collectionName">${data.collectionName[i].collectionName}</div>
                     <div class="collecionOver"></div>
                     </div>
                    `) .appendTo("#collectionDisplay")
                     }
                    for(let i=0;i<data.collectionName.length;i++){
                        var a=i+1;
                     for(let j=0;j<newarr[i].length;j++){
                         $(`<div class="collectionimg"><img src="${newarr[i][j]}"></div>`).appendTo(".collectionContainermain:nth-child("+a+") .collectionContainer .collectionSmall")
                        
                      }
             } 
                   
              

                 
                 } 

                


              } 
            
        })
        $("#image-display-container").css("display","none");       
    })

    $("#collectionDisplay").on("click",(event)=>{
       
        var Cname=event.target.previousElementSibling.innerText;
        console.log(Cname)
        window.location.href="/collect/"+Cname;
    })
})