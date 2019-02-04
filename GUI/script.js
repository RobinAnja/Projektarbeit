var pointList = new list[];

	$(document).ready(function(){
		/* Hier der jQuery-Code */
		console.log("Hallo Welt");
		/* Hier Daten einbinden 
		
		mögliche Speicherung von Testpunktzahlen bis auf die Frage genau: 
		localeStorage.setItem('REWE-PRUEFUNG2012-1', '2'); 


		Beispiel an JSON Datei: 
		$.getJSON("Pfad der datei", function(data){
		
			//Verarbeiten der Daten
		});
		
		*/
	});

	function savePoints(){
	alert("gespeichert");
		localeStorage.setItem(document.forms[0]["PfadFrage"].value, document.forms[0]["PunkteFrage"].value)
		
		readPoints();
	}

	function readPoints(){
		var element = '';
		for(var key in localeStorage){
			element+= "<div class=\"listEntry\">span class=\"PfadFrage\">" + key + "</span><span class=\"PunkteFrage\">" + localeStorage.getItem(key) + "</span></div>";
		}
		document.forms[0]["#pointsList"].append(element);
	}
