$(document).ready(function(){
    $("#uploadl").on("click",function(){
       $.ajax({
           url:"/cupload",
           success:(data)=>{
               if(data=="downloader"){
                   if(confirm("do you want to sync ")){
                       $.post("/cupload/syncupload",{userRole:"contributor"},(data,status)=>{
                           console.log("this is data "+data+" And this is status "+status);
                           window.location.href = "/cupload/upload";
                       })
                   }
               }
               else if(data=="contributor"){
                   console.log(data);
                   console.log(this);
                   window.location.href = "/cupload/upload";
               }
           },
           error:()=>{
               console.log("there is error");
           }
       })
    })
})