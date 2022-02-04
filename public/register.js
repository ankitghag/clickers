$(document).ready(function () {
    var flag=0;
  
    $('button[type="submit"]').click(function (event) {
        $("span").text("");
//validation

//first name validation

        if ($('input[name="firstName"]').val() === "") {
            //console.log("if stae"+JSON.stringify($(this)));
            $('input[name="firstName"]').siblings("span").text("first name cant be empty");
            flag=1;
        }

        else if (!(/^([a-zA-Z]{3,})$/.test($('input[name="firstName"]').val()))) {
            $('input[name="firstName"]').siblings("span").text("first name can contain only alphabet");
            flag=1;
            console.log()
        }

//lastname validation

        if ($('input[name="lastName"]').val() === "") {
            //console.log("if stae"+JSON.stringify($(this)));
            $('input[name="lastName"]').siblings("span").text("last name cant be empty");
            flag=1;
        }

        else if (!(/^([a-zA-Z]{3,})$/.test($('input[name="lastName"]').val()))) {
            $('input[name="lastName"]').siblings("span").text("last name can contain only alphabet");
            flag=1;
        }

//password validation

        if ($('input[name="psw"]').val() == "") {
            $('input[name="psw"]').siblings("span").text("psw cant be empty");
            flag=1;
        }
        else if ($('input[name="psw"]').val().length < 6) {
            $('input[name="psw"]').siblings("span").text("Password length should be greater then 6");
            flag=1;
        }

        else if ((/[a-z]/.test($('input[name="psw"]').val())) === false || (/[A-Z]/.test($('input[name="psw"]').val())) === false || (/[0-9]/.test($('input[name="psw"]').val())) === false || (/[@\!#\$%\^&\*\(\)\-_\+]/.test($('input[name="psw"]').val())) === false) {
            $('input[name="psw"]').siblings("span").text("Password dors not follow the given constraints");
            flag=1;
        }

//confirm password validation
if ($('input[name="confirmpsw"]').val() == "") {
    $('input[name="confirmpsw"]').siblings("span").text("psw cant be empty");
    flag=1;
}

 else if ($('input[name="psw"]').val() !==$('input[name="confirmpsw"]').val()){
    $('input[name="confirmpsw"]').siblings("span").text("Password does not match");
    flag=1;
    }

        $("body").css("background-color", "YELLOW");
        console.log(flag);
        //event.preventDefault();
        //console.log()
       
        if(flag==1){
             event.preventDefault();
           flag=0;
           }
        else{
            $("#registrationform").submit();
        }

    });

});