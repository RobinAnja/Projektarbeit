   
$(document).ready(function () {

    $("#RegisterForm").submit(function (event) {
    	var email = $("#email").val();
        var password = $("#password").val();
        var passwordCompare = $("#passwordCompare").val();
        //stop submit the form, we will post it manually.
        event.preventDefault();
        
        if(password == passwordCompare){
        	if(ValidateEmail(email)){
        		register();
        	}
        }else{
        	alert("Passwords are different");
        }
        

    });

});

function register() {
	
    var name = $("#username").val();
    var email = $("#email").val();
    var password = $("#password").val();
 
    $("#submitButton").prop("disabled", true);
    
    $.ajax({
        type:'GET',
        url: "/demo/register?name="+name+"&email="+email+"&password="+password,
        success: function(data){
        	if(data){
        		alert("Neuer User erstellt: Name:" + name + ", Email: " + email)
        		document.location.replace("http://localhost:8080/demo/anmelden");
        	}else{
        		alert("Ein Fehler ist aufgetreten. Überprüfen Sie ihre Angaben.")
        	}

        }
            });
          
}

function ValidateEmail(inputText)
{
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(inputText.match(mailformat))
{
alert(" Prüfen Sie bitte Ihren Email-Posteingang!");
//document.form1.Email.focus();
return true;
}
else
{
alert("Die Email-Adresse ist nicht korrekt!");
//document.form1.Email.focus();
return false;
}
}