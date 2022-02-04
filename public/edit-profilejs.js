$(document).ready(()=>{
    var flag=0;
    $('button[type="submit"]').click(function (event) {
        $("span").text("");

        if ($('input[name="fname"]').val() === "") {
            //console.log("if stae"+JSON.stringify($(this)));
            $('input[name="fname"]').siblings("span").text("first name cant be empty");
            flag=1;
        }

        else if (!(/^([a-zA-Z]{3,})$/.test($('input[name="fname"]').val().trim()))) {
            $('input[name="fname"]').siblings("span").text("first name can contain only alphabet");
            flag=1;
            console.log()
        }


        //lastname validation

        if ($('input[name="lname"]').val() === "") {
            //console.log("if stae"+JSON.stringify($(this)));
            $('input[name="lname"]').siblings("span").text("last name cant be empty");
            flag=1;
        }

        else if (!(/^([a-zA-Z]{3,})$/.test($('input[name="lname"]').val()))) {
            $('input[name="lname"]').siblings("span").text("last name can contain only alphabet and should be atleast three character");
            
            flag=1;
        }
        console.log(flag)
        if(flag==1){
            event.preventDefault();
          flag=0;
          }
       else{
           $("#registrationform").submit();
       }
    })

$("#deleteAccount").on("click",()=>{
    $.get("/delete",(data,status)=>{
        if(status=="success"){
            console.log(data);
            window.location.href="/home"
        }
    })
})

    }
)