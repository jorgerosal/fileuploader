var Excel = require('exceljs');
var fs = require('fs');
var workbook = new Excel.Workbook();



//initial coordinates based on the raw file
var header = 'UPC,ASIN,Title,Link'; // header


var row = {};


function parsemultiple(Sourcefilename, outputfilename, callback){
    console.log('Parsing...');
    
    var cleanFilename = outputfilename.substr(0, outputfilename.lastIndexOf('.'));
    var exportToCSV = fs.createWriteStream('./public/files/'+cleanFilename+'.csv');

    exportToCSV.write(header+"\n");


    workbook.xlsx.readFile('./uploads/'+Sourcefilename)
    .then(function() {
        var ws = workbook.getWorksheet(1); // use ID instead of specific sheet name. 1 means first sheet. 2...

        for (var i = 0; i < 5000; i++){
           // console.log(i);

        	var UpcHeaders = ws.getCell("E"+i).value;
        	var AsinVal = JSON.stringify(ws.getCell("C"+i).value);

        	if (UpcHeaders == 'UPC') {
        		row.UPC = ws.getCell("D"+i).value;

        		//console.log(row.UPC+', '+i);
        	}


        	if (AsinVal.indexOf('ASIN:') >= 0) { 

        		row.ASIN = AsinVal.replace('ASIN: ','').replace('"','').replace('"','');
        		row.Title = ws.getCell("C"+(i-1)).value;

        		row.link = "https://www.amazon.com/gp/offer-listing/"+row.ASIN;


        			var out = '="'+	row.UPC + '","'+ 
						row.ASIN + '","' + 
						row.Title + '","' + 
						row.link + '"';

					console.log(out);
					exportToCSV.write(out +"\n");

        	}	
        	
        	
        	if(i == 4999){
        	    callback();
        	}

        }

	});


}

module.exports = parsemultiple;