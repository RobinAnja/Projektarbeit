var global = this;
var type; 				//Type of Sorting: 0: Insertion; 1: Selection; 2; Quick
var firstRow;			//Array of Numbers which presents the first Row of Table
var init = true; 		//Defines if its the first Opening of page (initialisation)
var points = 9;			//points für test
var POINTS = 9;			//Constant value for maximum points
var startOfArary = 0;	//Index of first number to Number of Array
var mod = 9;			//length of Array (for % or / operations)

//Initialisation process

$(document).ready(function () {

	if(init){
		
		var table = $("#sortTable");
		global.firstRow = table.find('th');
		
		switch (global.firstRow.length){
		case 12: {
			global.type = 0;
			global.startOfArray = 2;
			global.mod = 12;
			break;}
		case 11: {
			global.type = 1;
			global.startOfArray = 1;
			global.mod = 11;
			global.POINTS = global.POINTS-1; //One step less needed for Selectionsort
			global.points = global.points-1; 
			break;}
		case 9: {
			global.type = 2; 
			global.startOfArray = 0;
			global.mod = 9;
			global.POINTS = global.POINTS-1; //One step less needed for Selectionsort
			global.points = global.points-1; 
			break;
		}
		}
		$("#pointsText")[0].innerHTML = ("0 / "+global.POINTS+" Punkte");

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
        	
        	for(var i = 0; i < 9; i++)
        	{
        		var cell = data[i].toString();
        		
        		row[index].innerHTML = cell;
        		index = index + 1;
        	}   	
    		}
        });
};

// Click of Restart Button 

function GetNewSortArray(){

	var table = $("#sortTable");
	var cells = table.find('INPUT');
	var cellsVisuals = table.find('td');
	
	for(var i = 0; i < cells.length; i++){
		cells[i].value = "";
		cellsVisuals[i].style.color = 'white';
	}
	$("#pointsText")[0].innerHTML = ("0 / "+global.POINTS+" Punkte");
	//create new array in firstrow
	fillFirstRow();
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
		$("#pointsText")[0].innerHTML = (points.toString() + " / "+global.POINTS+" Punkte");
		
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

	switch (firstRow.length){
	case 12: {array = GetCorrectInsertionSortArray(0, array, 0); break;}
	case 11: {array = GetCorrectSelectionSortArray(0, array, 0); break;}
	case 9: {array = GetCorrectQuickSortArray(array); break;}
	}

	return array;
};


function GetCorrectInsertionSortArray(run, array, changeCount){

	var w;
	var j;
	var firstNumb;
	var correctResult=[];
	var index = 0;
	var startIndex = 1;
	var count = parseInt(changeCount);
	var endIndex = array.length;
	
	if(run > 0){
		startIndex+=2;
		endIndex--;
		}
	
	var i = startIndex + parseInt(run);

	// start sorting process
	for(i; i < endIndex; i++){
		w = array[i];
		firstNumb = w;
		j = i - 1;
		
		while(w < array[j]){
			if(j >= (startIndex - 1)){
            array[j+1] = array[j];
			j = j - 1;
			count++;
			}
		}
		array[j+1] = w;
		
		
		correctResult[index] = ((i+1)-startIndex);
		index++;
		correctResult[index] = firstNumb;
		index++;
		var forCount = 0;
		if(run>0){forCount+=2;}
		
		for(var c = forCount; c < forCount + 9; c++)
		{

			correctResult[index] = array[c];
			index++;
		}
		
		correctResult[index] = count;
		index++;
		
	}
	return correctResult;
};

function GetCorrectSelectionSortArray(run, array, count){
	var index = 0;
	var count = count;
	var startIndex = parseInt(run);
	var endIndex = startIndex + firstRow.length;
	var correctResult =  [];
	
	if (run>0){
		startIndex++;
		endIndex--;
		}
	
		for (var i = startIndex; i < endIndex - 2; i++) {
		for (var j = i + 1; j < endIndex; j++) {
			if (array[i] > array[j]) {
				var temp = array[i];
				array[i] = array[j];
				array[j] = temp;
				count++;
			}
					
		}
		
		correctResult[index] = i;
		index++;
		
		var arrayStart = 0; 
		if(run>0){arrayStart=1;}
		
		for(var k = arrayStart; k < arrayStart + firstRow.length -2; k++)
		{
			correctResult[index] = array[k];
			index++;
		}
		
		correctResult[index] = count;
		index++;
}
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

	for(var i = index; i < cells.length; i++){
		if (index == cells.length){
			break;
		}
		
		if(cells[i].value){
			if(cells[i].value != correctResult[compareIndex]){
					if(checkForResult(correctResult, cells, mod, i)){
						if(i == 0){
							global.points = 0;
							return global.points;
						
						}else{
							
						// Check if last steps deliver the same result
						// (unneccessary for user because of double rowresults)

						var notNecessarySteps = countNotNecessarySteps(correctResult);
						var missingSteps = (global.firstRow.length - ((i/global.mod) + 1 - global.startOfArray)) - notNecessarySteps;
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
									return parseInt(global.points);
								}
							}
							
							checkForOtherErrorsInRow(mod, newIndex, compInd, cells, correctResult);
							
							global.points--;
							if (global.points < 0){
								global.points = 0;
							}
							
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
							
							correctArray(array, newIndex + mod, type, global.points);
							break;
							}else{
								return parseInt(global.points);
							}		
							
						}
				
			}else{
				cellsVisuals[index].style.color = 'white';
				if(checkForResult(correctResult, cells, mod, i)){
					return global.points;
				}
			}
		
			}else{	
			
			var missingSteps = global.firstRow.length - ((i/global.mod) + 1 - global.startOfArray);
			global.points = global.points - missingSteps;
			if (global.points < 0){global.points = 0;};
			return parseInt(global.points);
		}
		compareIndex++;
		}

	return parseInt(global.points);
};

function checkForOtherErrorsInRow(mod, index, compareIndex, cells, correctResult){
	var table = $("#sortTable");
	var cellsVisuals = table.find('td');
	
	for(var i = index; i < index + mod; i++){
		if (cells[i].value != correctResult[compareIndex]){
			cellsVisuals[i].style.color = 'red';
		}
		compareIndex++;
	}
}

function countNotNecessarySteps(correctResult){

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
	
	for (var k = correctResult.length - mod; k < correctResult.length; k++){
		if(cells[index].value){
			if(cells[index].value != correctResult[k]){
			return false;
			}
	}
		index++;
	}
	return true;
};

