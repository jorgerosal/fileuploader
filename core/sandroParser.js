var Excel = require('exceljs');
var fs = require('fs');
var workbook = new Excel.Workbook();



//initial coordinates based on the raw file
var col_value = ['C','D','E','F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q','R','T','U'];
var row_value = 1;
var header = 'sku,itemNumber,color,dimension,size,qty'; // header

var sku = "";
var itemNumber = "";
var color = "";
var dimension = "";
var size = "";
var qty = "";


function sandroParser(Sourcefilename, sheetname, outputfilename){
	var cleanFilename = outputfilename.substr(0, outputfilename.lastIndexOf('.'));

var exportToCSV = fs.createWriteStream('./public/files/'+cleanFilename+'.csv');
exportToCSV.write(header+"\n");


workbook.xlsx.readFile('./uploads/'+Sourcefilename)
    .then(function() {
        var ws = workbook.getWorksheet(sheetname);
		//console.log('io');

        //console.log(ws.getCell('A2').value);
        
	    for (var j = 0; j < 5000; j++) {
	        for (var i = 0; i < col_value.length; i++) {
	        	

				if (ws.getCell('A'+j).value == 'Item Number' || ws.getCell('A'+j).value == 'STYLE TOTAL:'|| ws.getCell('A'+j).value == 'STYLE'){
					row_value = j+1;
				}

				
				var basket = ws.getCell('A'+j).value+"";
				var dimChecker = basket.indexOf("  ");

				if(dimChecker >=0){

					color = ws.getCell('A'+j).value.substring(0, dimChecker);
					dimension = ws.getCell('A'+j).value.substring(dimChecker +2).replace(/\s/g, '');

				} else{

					color = ws.getCell('A'+j).value;
					dimension = ws.getCell('B'+j).value;
				}

				itemNumber = ws.getCell('A'+row_value).value;				
				
				size = ws.getCell(col_value[i]+(row_value)).value;
				if (size == "6..5"){
					size = "6.5";
				}

				qty = ws.getCell(col_value[i]+j).value;
				sku = "SDM-"+itemNumber+"_"+color+"_"+size+"-"+dimension;

				var out =  sku + ','+ 
	        				itemNumber + ',' + 
	        				color + ',' + 
	        				dimension + ',' + 
	        				size + ',' + 
	        				qty;



	        	if (out.indexOf('null') >= 0) {
	        	continue;
	        	} 
	        	else{
	        	//console.log(out);
	        	exportToCSV.write(out +"\n");
	        	}

			}
		
		}

    });
}

module.exports = sandroParser;
