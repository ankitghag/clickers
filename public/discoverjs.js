$(document).ready(() => {

$.get("/discover/discoverCategories",(data,status)=>{
    console.log(data)
    var data1=[]
    for(let i =0;i<data.length;i++){
        
        if(data[i].categoriesPhoto.length>0){
            data1.push(data[i])
        }
    }
    for(let i=0;i<data1.length;i++){
        
        $(`<div class="collectionContainermain">
        <div class="collectionContainer">
        <div class="collectionBig"> <div class="collectionBigimg"><img src='${data1[i].categoriesPhoto[0]}'></div></div>
        <div class="collectionSmall"> 
       
        </div>
         </div>
         <div class="collectionName">${data1[i].categoriesName}</div>
         <div class="collecionOver"></div>
         </div>
        `) .appendTo("#CategorisDisplay")
         }
        for(let i=0;i<data1.length;i++){
            var a=i+1;
         for(let j=1;j<data1[i].categoriesPhoto.length;j++){
             $(`<div class="collectionimg"><img src="${data1[i].categoriesPhoto[j]}"></div>`).appendTo(".collectionContainermain:nth-child("+a+") .collectionContainer .collectionSmall")
            
          }
 } 
   
})
 

    $("#CategorisDisplay").on("click",(event)=>{
        var Cname=event.target.previousElementSibling.innerText;
        console.log(Cname)
        window.location.href="/discover/"+Cname
    })





})