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

	var rowStart = 0;
	var count = 0;
	
	for (var i = 0; i < array.length - 1; i++) {
		for (var j = i + 1; j < array.length; j++) {
			if (array[i] > array[j]) {
				var temp = array[i];
				array[i] = array[j];
				array[j] = temp;
				count = count + 1;
			}
					
		}
		//fill row after row
		otherRow[rowStart].value = i.toString();
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

function quickSort() {
	 
	//get start array 
	var array = $("#sortTable");
	var firstRow = array.find('th');
	
	var array = new Array(9);
	
	//create Integer start array
	for(var i=0; i < 9; i++)
	{
		array[i] = parseInt(firstRow[i].innerHTML);
	}	

	//get result array positions
	var resultArray = $("#sortTable");
	var otherRow = resultArray.find('INPUT');
	var rowStart = 0;
	var count = 0;

	for (var i = 0; i < array.length - 1; i++) {
		for (var j = i + 1; j < array.length; j++) {
			if (array[i] > array[j]) {
				var temp = array[i];
				array[i] = array[j];
				array[j] = temp;
				count = count + 1;
			}
					
		}
		//fill row after row
		for(var k= 0; k < 9; k++)
		{
			var cell = array[k];
			otherRow[rowStart].value = cell.toString();
			rowStart = rowStart + 1;
		}	
	}
}