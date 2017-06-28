var Excel = require('exceljs');
var fs = require('fs');
var workbook = new Excel.Workbook();



//initial coordinates based on the raw file
var header = 'StyleName,StyleNumber,Color,Price,MSRP,AvailFrom,ATS Availability Dates,Size,QTY'; // header
var columns = ['A','B','C','D','E'];
var styleName = "";
var styleNumber = "";
var color = "";
var price = "";
var msrp = "";
var availFrom = "";
var availDate = "";
var size = "";
var qty = "";

var row = {};

function globeParser(Sourcefilename, outputfilename){
	console.log('running globparser');
	var cleanFilename = outputfilename.substr(0, outputfilename.lastIndexOf('.'));

var exportToCSV = fs.createWriteStream('./public/files/'+cleanFilename+'.csv');
exportToCSV.write(header+"\n");

workbook.xlsx.readFile('./uploads/'+Sourcefilename)
    .then(function() {
        var ws = workbook.getWorksheet(1); // use ID instead of specific sheet name. 1 means first sheet. 2...


        for (var z = 0; z < columns.length; z++){
        	var	col = columns[z];
        	console.log(col);

	        for (var i = 0; i < 5000; i++){
	        	

	    		//console.log(ws.getCell(col+i).value);

	        	var cellVal = JSON.stringify(ws.getCell(col+i).value);
	        
	        	if(cellVal.indexOf('Style #') >= 0){

	        		row.styleName = ws.getCell(col+(i-1)).value;
	        		row.styleNumber = ws.getCell(col+i).value;
					row.color = ws.getCell(col+(i+1)).value;
					row.price = ws.getCell(col+(i+2)).value;
					row.msrp = ws.getCell(col+(i+3)).value;
					row.availFrom = ws.getCell(col+(i+4)).value;

					var triggerNoInv = true;
					var y = 0;
					var avi = "";
					while(JSON.stringify(ws.getCell(col+(i+5+y)).value).indexOf('Style #') == -1){

						if(JSON.stringify(ws.getCell(col+(i+5+y)).value).indexOf('Immediate inventory:') >= 0 || JSON.stringify(ws.getCell(col+(i+5+y)).value).indexOf('Inventory arriving') >= 0){

							avi = ws.getCell(col+(i+5+y)).value;

						}  

						if(JSON.stringify(ws.getCell(col+(i+5+y)).value).indexOf(':') >= 0 && JSON.stringify(ws.getCell(col+(i+5+y)).value).indexOf('nventory') == -1 && JSON.stringify(ws.getCell(col+(i+5+y)).value).indexOf('Page') == -1){
							row.availDate = avi; 
							var	str = ws.getCell(col+(i+5+y)).value;
							
							row.size = str.substring(0, str.search(":"));

							//row.size = ws.getCell(col+(i+5+y)).value;
							row.qty = str.substring(str.search(":")+2);
							polish(row);
							triggerNoInv = false;

						}
						//console.log(y);
						y++;
						if(y >=50){
							break;
						}
					} // end of while loop

					if(triggerNoInv){
						row.availDate = "";
						row.size = "";
						row.qty = "";
						polish(row);
					}		
	        	}	// end of 2nd for-loop	
        } // end of first for-loop
    }
});


function polish(row){

	var out = '"'+	row.styleName + '","'+ 
		row.styleNumber + '","' + 
		row.color + '","' + 
		row.price + '","' + 
		row.msrp + '","' + 
		row.availFrom + '","' + 
		row.availDate + '","' + 
		row.size + '","' + 
		row.qty +'"';

	var clean = out.replace('Style #: ','').replace('Color: ','').replace('Price: ','').replace('M.S.R.P.: ','').replace('Avail. From: ','');


	console.log(clean);
	exportToCSV.write(clean +"\n");

}

}

module.exports = globeParser;