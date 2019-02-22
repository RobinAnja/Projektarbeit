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

function insertionSort() {
 
 //get start array 
	var array = $("#sortTable");
	var firstRow = array.find('th');
	var startIndex = 2; 
	
	var array = new Array(9);
	
	//get result array positions
	var resultArray = $("#sortTable");
	var otherRow = resultArray.find('INPUT');
	var rowStart = 0;
	
	//create Integer start array
	for(var i=0; i < 9; i++)
	{
		array[i] = parseInt(firstRow[startIndex].innerHTML);
		startIndex = startIndex + 1;
	}	
	
	var w;
	var j;
	var count = 0; 
	var firstNumb;
	
	//start sorting process
	for(var i = 1; i < array.length; i++){
		console.log(array.length);
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
		
		console.log(i);
		
		//fill row after row
		otherRow[rowStart].value = i.toString();
		rowStart = rowStart + 1;
		otherRow[rowStart].value = firstNumb.toString();
		rowStart = rowStart + 1;
		
		for(var k= 0; k < 9; k++)
		{
			var cell = array[k];
			otherRow[rowStart].value = cell.toString();
			rowStart = rowStart + 1;
		}	 
		otherRow[rowStart].value = count.toString();
		rowStart = rowStart + 1;
	}
	
	};

function selectionSort(){
	 
	//get start array 
	var array = $("#sortTable");
	var firstRow = array.find('th');
	var startIndex = 1; 
	
	var array = new Array(9);
	
	//create Integer start array
	for(var i=0; i < 9; i++)
	{
		array[i] = parseInt(firstRow[startIndex].innerHTML);
		startIndex = startIndex + 1;
	}	

	//get result array positions
	var resultArray = $("#sortTable");
	var otherRow = resultArray.find('INPUT');
	
	var correctResult = getCorrectSelectionSortArray(array);
	
	insertResultToTable(otherRow, correctResult);
	};

function insertResultToTable(result){
	//get result array positions
	var table = $("#sortTable");
	var cells = table.find('INPUT');
	
	for(var i = 0; i < result.length; i++){
		cells[i].value = result[i];
	}
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


function quickSort() {
	 
	var unsortedArray = getUnsortedArray();
	
	var correctResult = getCorrectQuickSortArray(unsortedArray);
	
	insertResultToTable(correctResult);
	
};

function getUnsortedArray(){
	//get start array 
	var table = $("#sortTable");
	var firstRow = table.find('th');
	
	var array = new Array(9);
	
	//create Integer start array
	for(var i=0; i < 9; i++)
	{
		array[i] = parseInt(firstRow[i].innerHTML);
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

function correctQuickSort(){
	var unsortedArray = getUnsortedArray();
	
	var correctResult = getCorrectQuickSortArray(unsortedArray,);
	
	var points = correctUserResult(correctResult, 0, 2, 9);
	console.log("Points: " + points);
};


// correctresult: richtiges Ergebnis
// index: startindex (wichtig wegen internem Aufruf der Methode mit anderem Startindex)
// type: 0 = Insertionsort, 1 = selectionSort, 2 = Quicksort
// points: punkte für Aufgabe. Entsprechen der Anzahl der durchläufe
function correctUserResult(correctResult, index, type, points){
	console.log(correctResult);
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
	
	for(var i = 0; i < correctResult.length; i++){
		if(cells[index].value){
			if((correctResult.includes(parseInt(cells[index].value)))){
			if(cells[index].value != correctResult[i]){
				if(index == 0){
					points = 0; 
					console.log("cell 0 falsch")
					return points;
				}else{
					if(checkForResult(correctResult, cells, mod, index)){
						if(index == 0){
							points = 0;
							console.log("Der Algorithmus ist von Bedeutung, nicht das Ergebnis!")
							return points;
						
						}
						//Check if last steps deliver the same result (unneccessary for user because of double rowresults)
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
						
						
												
						var missingSteps = parseInt((((correctResult.length - (index + 1))/mod))) - backstep;
						if(missingSteps > 0){console.log("You missed steps: " + missingSteps);}
						points = points - missingSteps;
						if (points < 0){points = 0;};
						console.log("test");
						return parseInt(points);
						}		
					console.log("wrong cell: " + index + " value: " + cells[index].value);
					cellsVisuals[index].style.color = 'red';
					var array = [];
					var j = 0;
					
					//check for actual row to be complete
					for (var k = (index/mod); k < ((index/mod) + mod -1); k++){
						if(cells[k].value){
							array[j] = cells[k].value;
							j++;
						}else{
							console.log("Nicht vollständig gelöst");
							return parseInt(points);
						}
					}
					
					index = (index/mod) + mod; 
					points = points - (((correctResult.length - (index + 1))/9) + 1);
					if (points < 0){
						points = 0;
						console.log("test");
						return parseInt(points); 
						}
					correctUserResult(getCorrectQuickSortArray(array), index, type, points);
				
				}
			}else{
				cellsVisuals[index].style.color = 'white';
			}
			}else{
				var missingSteps = parseInt((mod -parseInt((index + 1)/mod)));
				points = points - missingSteps;
				if (points < 0){points = 0;};
				console.log("Zu sortierendes Array enthält den Wert " + cells[index].value + " der Zelle " + (index % 9) + " in Zeile " + (index/9) +" nicht.");
				cellsVisuals[index].style.color = 'red';
				return parseInt(points);
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
		

	console.log("Correct Result");
	return parseInt(points);
};


function checkForResult(correctResult, cells, mod, index){
	var count = correctResult.length - (mod);
	for (var k = (index - (index % (mod-1))); k < ((index/mod) + mod -1); k++){
		if(cells[k].value){
			if(cells[k].value != correctResult[count]){
			return false;
			}
			
		}
		count++;
	}
	return true;
}
