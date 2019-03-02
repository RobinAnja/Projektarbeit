var global = this;
var init = true; 
var selectedTextButton = "";
var selectedButton = ""; 
var previousSelectedTextButton = "";
var previousSelectedButton = ""; 
var switchDone = false;

$(document).ready(function () {

	if(init){
		var text = "";
		var buttons = "";
		console.log("aufgerufen");
		text += "<div>";
		buttons += "<div>";
		for (i = 0; i < 20; i++) {
			buttons += "<button id=Button"+ i + " onclick=ButtonClicked(Button" + i + ")>" + i + ". Lücke </button>";
		  text += "<button id=textButton"+ i + " onclick=TextButtonClicked(textButton" + i + ")></button>" + i + ". Teil des Textes.";
		}
		text += "<br><br></div>";
		buttons += "</div>";
		
		$("#TextForm").append(text);      // Append the new elements 
		$("#ButtonForm").append(buttons);		
		
		var form = $("#TextForm");
		var buttonsInForm = form.find('BUTTON');


		console.log($("#TextForm"));
		console.log($("#ButtonForm"));
		console.log("fertig");
		global.init = false;
	}
	
});

function ButtonClicked(buttonId){
	
		if (global.switchDone){
			global.switchDone = false; 
			$(global.previousSelectedButton).css('border-color','white');
			$(global.previousSelectedTextButton).css('border-color','white');
			global.selectedButton = buttonId; 
		}else{
			if(global.selectedTextButton != ""){
				console.log(switchDone);
				$(global.selectedTextButton).html($(buttonId).html());
				global.previousSelectedButton = buttonId;
				global.previousSelectedTextButton = global.selectedTextButton; 
				global.selectedTextButton = ""; 
				global.selectedButton = "";
				global.switchDone = true;
			}else{
				global.selectedButton = buttonId;
			}
		}
		$(buttonId).css('border-color','#F93');
}

function TextButtonClicked(buttonId){
	if (global.switchDone){
		global.switchDone = false; 
		$(global.previousSelectedButton).css('border-color','white');
		$(global.previousSelectedTextButton).css('border-color','white');
		global.selectedTextButton = buttonId; 
	}else{
		if(global.selectedButton != ""){
			console.log(switchDone);
			$(buttonId).html($(global.selectedButton).html());
			global.previousSelectedButton = global.selectedButton;
			global.previousSelectedTextButton = buttonId; 
			global.selectedTextButton = ""; 
			global.selectedButton = "";
			global.switchDone = true;
		}else{
			global.selectedTextButton = buttonId;
		}
	}
	$(buttonId).css('border-color','#F93');
}
