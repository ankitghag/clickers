$(document).ready(()=>{
    var flag=0;
    $('button[type="submit"]').click((e)=>{

        $("span").text("");

        if ($('input[name="psw"]').val() == "") {
            $('input[name="psw"]').siblings("span").text("psw cant be empty");
            flag=1;
        }

        if ($('input[name="newpsw"]').val() == "") {
            $('input[name="newpsw"]').siblings("span").text("psw cant be empty");
            flag=1;
        }
        else if ($('input[name="newpsw"]').val().length < 6) {
            $('input[name="newpsw"]').siblings("span").text("Password length should be greater then 6");
            flag=1;
        }

        else if ((/[a-z]/.test($('input[name="newpsw"]').val())) === false || (/[A-Z]/.test($('input[name="psw"]').val())) === false || (/[0-9]/.test($('input[name="psw"]').val())) === false || (/[@\!#\$%\^&\*\(\)\-_\+]/.test($('input[name="psw"]').val())) === false) {
            $('input[name="newpsw"]').siblings("span").text("Password dors not follow the given constraints");
            flag=1;
        }

        if(flag==1){
            e.preventDefault();
          flag=0;
          }
       else{
           $("#registrationform").submit();
       }
    })
})