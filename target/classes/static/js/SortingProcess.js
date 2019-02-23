$(document).ready(function () {

	var init = true;
	if(init){
		fillFirstRow();
		init = false;
		}
	
});

function fillFirstRow(){
	$.ajax({
        type:'GET',
        url: "/demo/randomArrayNumbers",
        success: function(data){
        	
        	var array = $("#sortTable");
        	var firstRow = array.find('th');
        	var startIndex; 
        	
        	switch (firstRow.length){
        	case 12: {startIndex = 2; break;}
        	case 11: {startIndex = 1; break;}
        	case 9: {startIndex = 0; break;}
        }
        	for(var i = 0; i < 9; i++)
        	{
        		var cell = data[i].toString();
        		firstRow[startIndex].innerHTML = cell;
        		startIndex = startIndex + 1;
        	}
        	
        	console.log(getCorrectQuickSortArray(data));
        	}
        });
};

function InsertionSort() {
 
 // get start array
	var array = $("#sortTable");
	var firstRow = array.find('th');
	var startIndex = 2; 
	
	var array = new Array(9);
	
	// create Integer start array
	for(var i=0; i < 9; i++)
	{
		array[i] = parseInt(firstRow[startIndex].innerHTML);
		startIndex = startIndex + 1;
	}	
	

	console.log(array);
	var correctResult = getCorrectInsertionSortArray(array, 0, 0, 0, true);
	console.log(correctResult);
	insertResultToTable(correctResult);
	
	};

function SelectionSort(){
	 
	// get start array
	var array = $("#sortTable");
	var firstRow = array.find('th');
	var startIndex = 1; 
	
	var array = new Array(9);
	
	// create Integer start array
	for(var i=0; i < 9; i++)
	{
		array[i] = parseInt(firstRow[startIndex].innerHTML);
		startIndex = startIndex + 1;
	}	
	
	var correctResult = getCorrectSelectionSortArray(array);
	
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

//run: first cell value
//count: last cell value
//array: das neue array (9-12 stellen)
//x: index of run
function getCorrectInsertionSortArray(array, run, count, startPoint, init){
	console.log("getCorrectInsertionSortArray");
	var w;
	var j;
	var firstNumb;
	var correctResult=[];
	var index = 0;
	var startIndex = parseInt(array[0]) + parseInt(3);
	var endIndex = array.length - 1; 
	
	if (init){
		startIndex = 1;
		endIndex = array.length;
		}
	console.log("startindex: "+startIndex + ", endIndex: "+array.length);
	// start sorting process
	for(i = startIndex; i < endIndex; i++){
		console.log(i);
		w = array[i];
		firstNumb = w;
		j = i - 1;
		
		while(w < array[j]){
			array[j+1] = array[j];
			j = j - 1;
			count = count + 1;
		}
		array[j+1] = w;
		
		
		correctResult[index] = parseInt(run) + parseInt(i-startIndex);
		index++;
		correctResult[index] = firstNumb;
		index++;
		
		var k = 2; 
		if(init){
			k = 0; 
		}
		for(var c = k; c < 9 + k; c++)
		{
			console.log(array[c]);
			correctResult[index] = array[c];
			index++;
		}
		
		correctResult[index] = count;
		index++;
	}
	return correctResult;
	
};

function getCorrectSelectionSortArray(array){
	var index = 0;
	var count = 0;
	var correctResult =  [];
	
		for (var i = 0; i < array.length - 1; i++) {
		for (var j = i + 1; j < array.length; j++) {
			if (array[i] > array[j]) {
				var temp = array[i];
				array[i] = array[j];
				array[j] = temp;
				count = count + 1;
			}
					
		}
		
		correctResult[index] = i;
		index = index + 1;
		
		for(var k= 0; k < array.length; k++)
		{
			correctResult[index] = array[k];
			index = index + 1;
		}
		
		correctResult[index] = i;
		index = index + 1;
	
}

	return correctResult
};


function QuickSort() {
	 
	var unsortedArray = getUnsortedArray();
	
	var correctResult = getCorrectQuickSortArray(unsortedArray);
	
	insertResultToTable(correctResult);
	
};

function getUnsortedArray(){
	// get start array
	var table = $("#sortTable");
	var firstRow = table.find('th');
	var startIndex;
	var array = new Array(9);
	
	switch (firstRow.length){
	case 12: {startIndex = 2; break;}
	case 11: {startIndex = 1; break;}
	case 9: {startIndex = 0; break;}
}
	
	// create Integer start array
	for(var i=0; i < 9; i++)
	{
		array[i] = parseInt(firstRow[startIndex].innerHTML);
		startIndex++;
	}	
	return array;
};

function getCorrectQuickSortArray(array){
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

function CorrectQuickSort(){
	var unsortedArray = getUnsortedArray();
	
	var correctResult = getCorrectQuickSortArray(unsortedArray,);
	
	var points = correctUserResult(correctResult, 0, 2, 9);
	console.log("Points: " + points);
};


// correctresult: richtiges Ergebnis
// index: startindex (wichtig wegen internem Aufruf der Methode mit anderem
// Startindex)
// type: 0 = Insertionsort, 1 = selectionSort, 2 = Quicksort
// points: punkte für Aufgabe. Entsprechen der Anzahl der durchläufe
function correctUserResult(correctResult, index, type, points){
	console.log("correctUserResult");
	var table = $("#sortTable");
	var cells = table.find('INPUT');
	var cellsVisuals = table.find('td');
	var mod = 12;
	var lineIsResult = false;
	
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
		console.log(index);
		console.log(i);
		//index = 0
		if(cells[index].value){
			console.log("cells["+index+"].value="+cells[index].value+" != correctResult["+i+"]="+correctResult[i]);
			if(cells[index].value != correctResult[i]){
					if(checkForResult(correctResult, cells, mod, index)){
						if(index == 0){
							points = 0;
							console.log("Der Algorithmus ist von Bedeutung, nicht das Ergebnis!")
							return points;
						
						}else{
							// Check if last steps deliver the same result
						// (unneccessary for user because of double rowresults)
						
						var notNecessarySteps = countNotNecessarySteps();
												
						var missingSteps = parseInt((((correctResult.length - (index + 1))/mod))) - notNecessarySteps;
						if(missingSteps > 0){console.log("You missed steps: " + missingSteps);}
						points = points - missingSteps;
						if (points < 0){points = 0;};
						return parseInt(points);
						}
						}else{
					
							console.log("wrong cell: " + index + " value: " + cells[index].value);
							cellsVisuals[index].style.color = 'red';
							
							var array = [];
							var j = 0;
							newIndex =index - (index%mod);
					
							// check for actual row to be complete
							for (var k = newIndex; k < newIndex + mod; k++){
								if(cells[k].value){
									array[j] = cells[k].value;
									j++;
								}else{
									console.log("Nicht vollständig gelöst");
									return parseInt(points);
								}
							}
					
							points--;
							if (points < 0){
								points = 0;
							}
							console.log(array);
							switch(type){
								case 0:
									array = getCorrectInsertionSortArray(array, cells[newIndex].value, cells[newIndex + mod].value, index, false);
									break;
								case 1: 
									array = getCorrectSelectionSortArray(array);
									break;
								case 2: 
									array = getCorrectQuickSortArray(array);
									break;
							}
							
							console.log(array);
							correctUserResult(array, newIndex + mod, type, points);
						}
						
						
		
		
				
			}else{
				cellsVisuals[index].style.color = 'white';
			}
		
			}else{
			var missingSteps = parseInt((mod - parseInt(index/mod)));
			points = points - missingSteps;
			if (points < 0){points = 0;};
			console.log("Nicht vollständig gelöst. missingSteps: " + missingSteps);
			return parseInt(points);
		}
		index++;
		}
		
	console.log(index);
	console.log("Correct Result");
	return parseInt(points);
};


function countNotNecessarySteps(){
	console.log("countNotNecessarySteps");
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

	for (var k = correctResult.length - (mod + 1); k < correctResult.length; k++){
		if(cells[index].value){
			if(cells[index].value != correctResult[k]){
			return false;
			}
			
		}
		index++;
	}
	return true;
};

function CorrectSelectionSort(){
	
	var unsortedArray = getUnsortedArray();
	var correctResult = getCorrectSelectionSortArray(unsortedArray,);
	var points = correctUserResult(correctResult, 0, 1, 9);
	console.log("Points: " + points);
};

function CorrectInsertionSort(){
	var unsortedArray = getUnsortedArray();
	var correctResult = getCorrectInsertionSortArray(unsortedArray, 0, 0, 0, true);
	var points = correctUserResult(correctResult, 0, 0, 9);
	console.log("Points: " + points);
}


