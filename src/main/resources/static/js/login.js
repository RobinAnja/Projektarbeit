$(document).ready(function () {

    $("#loginForm").submit(function (event) {

        //stop submit the form, we will post it manually.
        event.preventDefault();
    		login();

    });

});

function login() {
 
    var name = $("#username").val();
    var password = $("#password").val();

    $("#submitButton").prop("disabled", true);
    
    $.ajax({
        type:'GET',
        url: "/demo/findByEmail?email="+name+"&password="+password,
        success: function(data){
        	console.log(data);
        	if(data){
        		document.location.replace("http://localhost:8080/demo/home");
        	}else{
        		alert("Es besteht noch kein Useraccount für " + name + ". ");
        	}
        	
        	
            }
        });
    
    
}