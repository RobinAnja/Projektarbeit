var global = this;
var init = true; 
var selectedTextButton = "";
var selectedButton = ""; 
var previousSelectedTextButton = "";
var previousSelectedButton = ""; 
var switchDone = false;
var POINTS;
var points;
var Buttons;

$(document).ready(function () {

	if(init){
		
		$.ajax({
	        type:'GET',
	        url: "/demo/prinzipien",
	        success: function(data){
	    		var text = "";
	    		var buttonsArray = [];
	    		
	    		text += "<div>";
	    	
	    		var index = 0; 
	    		var y = 0;
	    		text += data[index].toString();
	    		index+=2;
	        	for(var i = 1; i < data.length; i+=2)
	        	{
	        		buttonsArray[y] = data[i].toString();
	        		text += "<br><button id=textButton"+ index + " onclick=TextButtonClicked(textButton" + index + ")></button>" + data[index].toString();
	        		y++;
	        		index+=2;
	        	}	        	
	    		text += "<br><br></div>";
	    		
	    		global.POINTS = buttonsArray.length;
	    		global.points = global.POINTS;
	    		global.Buttons = buttonsArray; 
	    		
	    		var randomNumbersArray = [];
	    		var min = 0;
	    		var max = buttonsArray.length - 2;
	    		var x;
	    		var diff = 0; 
	    		
	    		for(var i = 0; i < buttonsArray.length; i++){
	    			x = Math.round(Math.random() * (max - min)) + min;
	    			if (randomNumbersArray.length > 0){
	    				while(randomNumbersArray.includes(x)){
	    					
	    					x = diff;
	    					if ((diff + 1) < buttonsArray.length){
	    						diff++;
	    					}
	    					
	    			}
	    			}
	    			randomNumbersArray[i] = x;
	    		}
	    		
	    		
	    		
	    		var buttons = "";
	    		buttons += "<div>";
	    		for (i = 0; i < buttonsArray.length; i++){
	    			//Button einfügen
	    			index = parseInt(randomNumbersArray[i]);
	    			buttons += "<button id=Button"+ i + " onclick=ButtonClicked(Button" + i + ")>" + buttonsArray[index].toString() + "</button>";
	    		}
	    		
	    		buttons += "</div>";
	    		
	    			
	    		$("#TextForm").append(text);      // Append the new elements 
	    		$("#ButtonForm").append(buttons);
	    		global.init = false;
	    		
	    		$("#pointsText")[0].innerHTML = ("0 / "+global.POINTS+" Punkte");
	    		}
	        });
		
	}
	
});

function ButtonClicked(buttonId){
		
	
		if (global.switchDone){
			global.switchDone = false; 
			$(global.previousSelectedButton).css('border-color','white');
			$(global.previousSelectedTextButton).css('border-color','white');
			global.previousSelectedButton = global.selectedButton;
			global.selectedButton = buttonId; 
		}else{
			if(global.selectedTextButton != ""){
				$(global.selectedTextButton).html($(buttonId).html());
				global.previousSelectedButton = buttonId;
				global.previousSelectedTextButton = global.selectedTextButton; 
				global.selectedTextButton = ""; 
				global.selectedButton = "";
				global.switchDone = true;
				$(buttonId).hide('fast');
			}else{
				global.previousSelectedButton = global.selectedButton;
				global.selectedButton = buttonId;
			}
		}
		$(global.previousSelectedButton).css('border-color','white');
		$(buttonId).css('border-color','#F93');
}

function TextButtonClicked(buttonId){
	
	if ($(buttonId).html() != ""){
		var text = $("#ButtonForm");
		var buttons = text.find('BUTTON');
		for(i = 0; i < buttons.length; i++){
			if (buttons[i].innerHTML == $(buttonId).html()){
				buttons[i].style.display="inline";
				break;
			}
		}
		if (global.selectedTextButton == buttonId){
			global.previousSelectedTextButton = global.selectedTextButton;
			global.selectedTextButton = ""; 
		}
		$(buttonId).html("");
		global.switchDone = false; 
	}
	
	if (global.switchDone){
		global.switchDone = false; 
		$(global.previousSelectedButton).css('border-color','white');
		$(global.previousSelectedTextButton).css('border-color','white');
		global.previousSelectedTextButton = global.selectedTextButton;
		global.selectedTextButton = buttonId; 
	}else{
		if(global.selectedButton != ""){
			$(buttonId).html($(global.selectedButton).html());
			global.previousSelectedButton = global.selectedButton;
			global.previousSelectedTextButton = buttonId; 
			global.selectedTextButton = ""; 
			$(global.selectedButton).hide('fast');
			global.selectedButton = "";
			global.switchDone = true;		
		}else{
			global.previousSelectedTextButton = global.selectedTextButton;
			global.selectedTextButton = buttonId;
		}
	}
	$(global.previousSelectedTextButton).css('border-color','white');
	$(buttonId).css('border-color','#F93');
};

function ShowResult(){
   	
    		var textForm = $("#TextForm");
    		var TextButtons = textForm.find('BUTTON');
    		
        	for(var i = 0; i < TextButtons.length; i++)
        	{
        		TextButtons[i].innerHTML = global.Buttons[i];
        		TextButtons[i].disabled = true; 
        		TextButtons[i].style.borderColor = 'grey';
        	}	
        	
        	var buttonForm = $("#ButtonForm");
    		var buttons = buttonForm.find('BUTTON');
        	
        	for(var i = 0; i < buttons.length; i++)
        	{
        		buttons[i].style.display="none";
        	}
        	$("#CorrectButton").prop("disabled",true);
        	$("#CorrectButton").css('color','grey');
};

function Restart(){
	var textForm = $("#TextForm");
	var TextButtons = textForm.find('BUTTON');
	
	for(var i = 0; i < TextButtons.length; i++)
	{
		TextButtons[i].innerHTML = "";
		TextButtons[i].disabled = false; 
		TextButtons[i].style.borderColor = 'white';
	}	
	
	var buttonForm = $("#ButtonForm");
	var buttons = buttonForm.find('BUTTON');
	
	for(var i = 0; i < buttons.length; i++)
	{
		buttons[i].style.display="inline";
	}
	$("#CorrectButton").prop("disabled",false);
	$("#CorrectButton").css('color','#F93');
	$("#pointsText")[0].innerHTML = ("0 / "+global.POINTS+" Punkte");
};

function CorrectUserInput(){
	var textForm = $("#TextForm");
	var TextButtons = textForm.find('BUTTON');
	var text = $("#ButtonForm");
	var buttons = text.find('BUTTON');
	
	for(i = 0; i < TextButtons.length; i++){
		console.log(TextButtons[i].innerHTML);
		console.log(global.Buttons[i]);
		if(TextButtons[i].innerHTML != global.Buttons[i]){
			global.points--;
			TextButtons[i].style.borderColor = 'red';
		}else{
			TextButtons[i].style.borderColor = 'grey';
		}
		TextButtons[i].disabled = true; 
		
		buttons[i].disabled = true; 
	}
	
	$("#CorrectButton").prop("disabled",true);
	$("#CorrectButton").css('color','grey');
	console.log(global.points.toString());
	$("#pointsText")[0].innerHTML = (global.points.toString() + " / "+global.POINTS+" Punkte");
}
