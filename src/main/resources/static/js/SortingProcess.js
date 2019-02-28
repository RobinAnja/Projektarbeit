var global = this;
var type = 0; 				//Type of Sorting: 0: Insertion; 1: Selection; 2; Quick
var firstRow;			//Array of Numbers which presents the first Row of Table
var init = true; 		//Defines if its the first Opening of page (initialisation)
var points = 9;			//points für test
var POINTS = 9;			//Constant value for maximum points
var startOfArary = 0;	//Index of first number to Number of Array
var mod = 9;			//length of Array (for % or / operations)
var mainArrayLength = 9; //length of the sorted array (without i, feld_ref[0], M)
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

//fills first row of table with received data from database
function fillFirstRow(){
	$.ajax({
        type:'GET',
        url: "/demo/randomArrayNumbers",
        success: function(data){
        	global.mainArrayLength = data.length;
        	var index = global.startOfArray;
        	var row = global.firstRow;
        	for(var i = 0; i < data.length; i++)
        	{
        		var cell = data[i].toString();
     		
        		row[index].innerHTML = cell;
        		index = index + 1;
        	}   	
    		}
        });
};

// Click of Restart Button: Generates new array from values from database and clears the table from user inputs
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
	$("#CorrectButton").prop("disabled",false);
	$("#CorrectButton").css('color','#F93');
};


//Click of Result Button: fills the table with result values
function GetResultTable() {
	 
	var correctResult = sortArray();
	insertResultToTable(correctResult);
	$("#CorrectButton").prop("disabled",true);
	$("#CorrectButton").css('color','grey');
};

//Puts result values into inputs (cells) in table
function insertResultToTable(result){
	// get result array positions
	var table = $("#sortTable");
	var cells = table.find('INPUT');
	
	for(var i = 0; i < result.length; i++){
		cells[i].value = result[i];
	}
};


//Correct Button Click: Compares the user input with the result
function CorrectUserSort(){

		var correctResult = sortArray();
		correctArray(correctResult, 0, global.type, global.points);
		$("#pointsText")[0].innerHTML = (global.points.toString() + " / "+global.POINTS+" Punkte");
		$("#CorrectButton").prop("disabled",true);
		$("#CorrectButton").css('color','grey');
};

//sorts the array from first row depending on the type of sort algorithm
function sortArray(){
	// get start array

	var startIndex = global.startOfArray;
	var firstRow = global.firstRow;
	var array = new Array(global.mainArrayLength);
	
	// create Integer start array
	for(var i=0; i < array.length; i++)
	{
		array[i] = parseInt(firstRow[startIndex].innerHTML);
		startIndex++;
	}

	switch (firstRow.length){
	case 12: {array = GetCorrectInsertionSortArray(0, array, 0); break;}
	case 11: {array = GetCorrectSelectionSortArray(0, array, 0); break;}
	case 9: {array = GetCorrectQuickSortArray(array); break;}
	}
	console.log(array);
	return array;
};

//sort algorithm "InsertionSort". Returns the values for input fields in table
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
		
		for(var c = forCount; c < forCount + global.mainArrayLength; c++)
		{

			correctResult[index] = array[c];
			index++;
		}
		
		correctResult[index] = count;
		index++;
		
	}
	return correctResult;
};

//sort algorithm "SelectionSort". Returns the values for input fields in table
function GetCorrectSelectionSortArray(run, array, count){
	var index = 0;
	var count = count;
	var startIndex = parseInt(run);
	var endIndex = startIndex + global.POINTS;
	var correctResult =  [];
	
	if (run>0){
		startIndex++;
		endIndex--;
		}
	
		for (var i = startIndex; i < endIndex; i++) {
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
		
		for(var k = arrayStart; k < arrayStart + global.mainArrayLength; k++)
		{
			correctResult[index] = array[k];
			index++;
		}
		
		correctResult[index] = count;
		index++;
}
	return correctResult
};


//sort algorithm "QuickSort". Returns the values for input fields in table
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
		for(var k= 0; k < array.length; k++)
		{
			result[index] = array[k];
			index++;
		}	
	}
	return result;
};


// compares the user input cells with the values from result array
// correctresult: right result from methods above
// index: index for comparison to start 
function correctArray(correctResult, index){

	var table = $("#sortTable");
	var cells = table.find('INPUT');
	var mod = global.mod;
	var lineIsResult = false;
	var compareIndex = 0;
	var cellsVisuals = table.find('td');
	
	console.log("cells: "+cells);
	console.log("result: "+correctResult);
	
	for(var i = index; i < cells.length; i++){
		if (index == cells.length){
			break;
		}
		
		if(cells[i].value){
			if(cells[i].value != correctResult[compareIndex]){
				console.log("cells["+i+"].value: "+cells[i].value+" != correctResult["+compareIndex+"]: "+correctResult[compareIndex]);
					if(checkForResult(correctResult, cells, mod, i)){
						if(i == 0){
							global.points = 0;
							return;
						
						}else{
							
						// Check if last steps deliver the same result
						// (unneccessary for user because of double rowresults)

						var notNecessarySteps = countNotNecessarySteps(correctResult);
						var missingSteps = global.POINTS - ((i/global.mod) + 1) - notNecessarySteps;
						global.points = global.points - missingSteps;
						if (global.points < 0){global.points = 0;};
						cellsVisuals[index].style.color = 'white';
						return;
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
									return;
								}
							}
							
							checkForOtherErrorsInRow(mod, newIndex, compInd, cells, correctResult);
							
							global.points--;
							if (global.points < 0){
								global.points = 0;
							}
							
							if (cells[newIndex + mod].value){
								switch(global.type){
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
							
							correctArray(array, newIndex + mod);
							break;
							}else{
								return;
							}		
							
						}
				
			}else{
				cellsVisuals[index].style.color = 'white';
				if(checkForResult(correctResult, cells, mod, i)){
					return;
				}
			}
		
			}else{	
			
			var missingSteps = global.POINTS - (parseInt(i/global.mod));
			console.log("Missing Steps: "+missingSteps);
			global.points = global.points - missingSteps;
			console.log(global.points);
			if (global.points < 0){global.points = 0;};
			return;
		}
		compareIndex++;
		}

	return;
};

// checks for other errors in row, to paint the cells red
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

// counts the steps that are not important for points (if array at some point is the same as the result -> sorted array)
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

// checks if the current line is the result line of result array (that means that its the end line or user is missing steps)
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

