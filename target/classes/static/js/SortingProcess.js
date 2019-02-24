var global = this;
var type; 				//Type of Sorting: 0: Insertion; 1: Selection; 2; Quick
var firstRow;			//Array of Numbers which presents the first Row of Table
var init = true; 		//Defines if its the first Opening of page (initialisation)
var points = 9;			//Maximum points für test
var startOfArary = 0;	//Index of first number to Number of Array

//Initialisation process

$(document).ready(function () {

	if(init){
		
		var table = $("#sortTable");
		global.firstRow = table.find('th');
		
		console.log(global.firstRow);
		
		switch (global.firstRow.length){
		case 12: {
			global.type = 0;
			global.startOfArray = 2;
			break;}
		case 11: {
			global.type = 1;
			global.startOfArray = 1;
			break;}
		case 9: {
			global.type = 2; 
			global.startOfArray = 0;
			break;
		}
		}
		
		console.log(global.startOfArray)
		
		fillFirstRow();
		init = false;
		}
	
});

function fillFirstRow(){
	$.ajax({
        type:'GET',
        url: "/demo/randomArrayNumbers",
        success: function(data){
        	var index = global.startOfArray;
        	var row = global.firstRow;
        	
        	console.log(row);
        	console.log(index);
        	
        	for(var i = 0; i < 9; i++)
        	{
        		var cell = data[i].toString();
        		
        		row[index].innerHTML = cell;
        		index = index + 1;
        	}   	
    		}
        });
};


//Click of Result Button

function GetResultTable() {
	 
	var correctResult = sortArray();
	insertResultToTable(correctResult);
	
};

	
function insertResultToTable(result){
	// get result array positions
	var table = $("#sortTable");
	var cells = table.find('INPUT');
	
	for(var i = 0; i < result.length; i++){
		cells[i].value = result[i];
	}
};


//Correct Button Click

function CorrectUserSort(){

		var correctResult = sortArray();
		var points = correctArray(correctResult, 0, global.type, global.points);
		$("#pointsText")[0].innerHTML = (points.toString() + " / 9 Punkte");
		
};

function sortArray(){
	// get start array

	var startIndex = global.startOfArray;
	var firstRow = global.firstRow;
	var array = new Array(9);
	
	// create Integer start array
	for(var i=0; i < 9; i++)
	{
		array[i] = parseInt(firstRow[startIndex].innerHTML);
		startIndex++;
	}
	console.log(array);
	switch (firstRow.length){
	case 12: {array = GetCorrectInsertionSortArray(0, array, 0); break;}
	case 11: {array = GetCorrectSelectionSortArray(0, array, 0); break;}
	case 9: {array = GetCorrectQuickSortArray(array); break;}
	}
	console.log(array);
	return array;
};


function GetCorrectInsertionSortArray(run, array, changeCount){
	
	console.log("getCorrectInsertionSortArray");
	var w;
	var j;
	var firstNumb;
	var correctResult=[];
	var index = 0;
	var startIndex = parseInt(run) + 1;
	var count = parseInt(changeCount);
	var endIndex = array.length;
	
	if(run > 0){
		startIndex+=2;
		endIndex--;
		}

	console.log("startindex: "+startIndex + ", endIndex: "+ endIndex);
	
	// start sorting process
	for(i = startIndex ; i < endIndex; i++){
		w = array[i];
		firstNumb = w;
		j = i - 1;
		
		while(w < array[j]){
			console.log(array[j]);
			console.log(w);
			
			array[j+1] = array[j];
			if (j>= (startIndex - 1)){
				j = j - 1;
			}else{
				break;
			}
			
			
			count++;
			console.log(count);
			console.log(j);
		}
		array[j+1] = w;
		
		
		correctResult[index] = i;
		index++;
		correctResult[index] = firstNumb;
		index++;
		var c = 0;
		if(run>0){c+=2;}
		
		for(c; c < c + 9; c++)
		{

			correctResult[index] = array[c];
			index++;
		}
		
		correctResult[index] = count;
		index++;
		console.log(correctResult);
	}

	return correctResult;
};

function GetCorrectSelectionSortArray(run, array, count){
	var index = 0;
	var count = count;
	var startIndex = parseInt(run) ;
	var endIndex = array.length;
	var correctResult =  [];
	

	
	if (run>0){
		startIndex++;
		endIndex--;
		}
	
	console.log(startIndex);
	console.log(endIndex);
	console.log(run);
		for (startIndex; startIndex < endIndex; startIndex++) {
		for (var j = startIndex + 1; j < endIndex; j++) {
			if (array[startIndex] > array[j]) {
				var temp = array[startIndex];
				array[startIndex] = array[j];
				array[j] = temp;
				count++;
			}
					
		}
		
		correctResult[index] = startIndex;
		index++;
		
		var k = 0; 
		if(run>0){k=1;}
		
		for(k; k < array.length; k++)
		{
			correctResult[index] = array[k];
			index++;
		}
		
		correctResult[index] = count;
		index++;
		console.log(array);
		console.log(index);
}
		console.log(correctResult);
	return correctResult
};



function GetCorrectQuickSortArray(array){
	var index = 0;
	var result = [];
	
	for (var i = 0; i < array.length - 1; i++) {
		for (var j = i + 1; j < array.length; j++) {
			if (array[i] > array[j]) {
				var temp = array[i];
				array[i] = array[j];
				array[j] = temp;
			}
					
		}
		for(var k= 0; k < 9; k++)
		{
			result[index] = array[k];
			index = index + 1;
		}	
	}
	return result;
};



// correctresult: richtiges Ergebnis
// index: startindex (wichtig wegen internem Aufruf der Methode mit anderem
// Startindex)
// type: 0 = Insertionsort, 1 = selectionSort, 2 = Quicksort
// points: punkte für Aufgabe. Entsprechen der Anzahl der durchläufe
function correctArray(correctResult, index, type, points){
	console.log("correctUserResult");
	var table = $("#sortTable");
	var cells = table.find('INPUT');
	var mod = 12;
	var lineIsResult = false;
	var compareIndex = 0;
	var cellsVisuals = table.find('td');
	
	if(type == 1){
		mod=11;
	}else if(type == 2){
		mod=9;
	}

	console.log(cells.length);
	for(var i = index; i < cells.length; i++){
		if (index == cells.length){
			break;
		}
		console.log(compareIndex);
		console.log(i);
		// index = 0
		if(cells[i].value){
			console.log("cells["+i+"].value="+cells[i].value+" != correctResult["+compareIndex+"]="+correctResult[compareIndex]);
			if(cells[i].value != correctResult[compareIndex]){
					if(checkForResult(correctResult, cells, mod, i)){
						if(i == 0){
							global.points = 0;
							console.log("Der Algorithmus ist von Bedeutung, nicht das Ergebnis!")
							return global.points;
						
						}else{
							// Check if last steps deliver the same result
						// (unneccessary for user because of double rowresults)
							console.log("wrong cell");
						var notNecessarySteps = countNotNecessarySteps();
												
						var missingSteps = parseInt((((correctResult.length - (i + 1))/mod))) - notNecessarySteps;
						if(missingSteps > 0){console.log("You missed steps: " + missingSteps);}
						global.points = global.points - missingSteps;
						if (global.points < 0){global.points = 0;};
						cellsVisuals[index].style.color = 'white';
						return parseInt(global.points);
						}
						}else{
					
							
							var array = [];
							var j = 0;
							var newIndex =i - (i%mod); // 72
							var compInd = compareIndex - (i-newIndex);
							// check for actual row to be complete
							for (var k = newIndex; k < newIndex + mod; k++){
								if(cells[k].value){
									array[j] = cells[k].value;
									j++;
								}else{
									console.log("Nicht vollständig gelöst");
									return parseInt(global.points);
								}
							}
							
							checkForOtherErrorsInRow(mod, newIndex, compInd, cells, correctResult);
							
							global.points--;
							if (global.points < 0){
								global.points = 0;
							}
							console.log("points: " + global.points);
							
							if (cells[newIndex + mod].value){
								switch(type){
								case 0:
									array = GetCorrectInsertionSortArray(cells[newIndex].value, array, cells[newIndex + mod - 1].value);
									break;
								case 1: 
									array = GetCorrectSelectionSortArray(cells[newIndex].value, array, cells[newIndex + mod - 1].value);
									break;
								case 2: 
									array = GetCorrectQuickSortArray(array);
									break;
							}
							
							console.log("new array");
							correctArray(array, newIndex + mod, type, global.points);
							break;
							}else{
								return parseInt(global.points);
							}		
							
						}
				
			}else{
				console.log("right");
				cellsVisuals[index].style.color = 'white';
				if(checkForResult(correctResult, cells, mod, i)){
					return global.points;
				}
			}
		
			}else{	
			
			var missingSteps = parseInt((mod - parseInt(i/mod)));
			global.points = global.points - missingSteps;
			if (global.points < 0){global.points = 0;};
			console.log("Nicht vollständig gelöst. missingSteps: " + missingSteps);
			return parseInt(global.points);
		}
		compareIndex++;
		}

	console.log("Correct Result");
	return parseInt(global.points);
};

function checkForOtherErrorsInRow(mod, index, compareIndex, cells, correctResult){
	var table = $("#sortTable");
	var cellsVisuals = table.find('td');
	
	for(var i = index; i < index + mod; i++){
		console.log("cells["+i+"].value: "+cells[i].value+" != correctResult["+compareIndex+"]:"+correctResult[compareIndex]);
		if (cells[i].value != correctResult[compareIndex]){
			cellsVisuals[i].style.color = 'red';
		}
		compareIndex++;
	}
}

function countNotNecessarySteps(){

	var backstep = 0;
	var resultRow = true;
	
	while (resultRow){
	
	var count = (correctResult.length - (mod*(backstep + 1))) - 1;
	var countpreviousRow = count - mod; 
	var runs = count;
	
	for (countpreviousRow; countpreviousRow < runs; countpreviousRow++){
	if(correctResult[countpreviousRow]){
		if(correctResult[countpreviousRow] != correctResult[count]){
		resultRow = false;
		backstep--;
		}
	}
	count++;
	}
	backstep++;
}
	return backstep;
};

function checkForResult(correctResult, cells, mod, index){
	console.log("checkForResult");
	console.log(correctResult.length - (mod + 1));
	console.log(correctResult.length)
	

	for (var k = correctResult.length - mod; k < correctResult.length; k++){
		if(cells[index].value){
			if(cells[index].value != correctResult[k]){
			return false;
			}
			
		}
		console.log("cell: "+cells[index].value+". result: "+correctResult[k]);
		index++;
	}
	return true;
};

