$(document).ready(()=>{
    $(".linkDivOverlay").on("click",(event)=>{
        console.log(event.target ) ; 
   var contributor=event.target.parentElement.previousElementSibling.firstElementChild.innerText  ;
   window.location.href="/contributor/@"+contributor
    })
})