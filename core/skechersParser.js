// var xls = require('excel');


// function convertToJSON(array) {
  
//   var size = array[0].join().trim().split(',');
//   var size2 = array[1].join().trim().split(',');
//   var size3 = array[2].join().trim().split(',');

//   for ( var i = 1; i < array.length; i++ )
//   {
   
//     var myRow = array[i].join().split(',');
//     //var row = myRow.split(',');
//   for(var j=5; j<myRow.length; j++){
//     if(!isNaN(myRow[3]) && myRow[3]!='' && myRow[j]!=''){
//       if(myRow[4]=='A'){
//       console.log(myRow[0]+'_'+myRow[1]+'_'+size[j]+','+myRow[j]);
//     }else if(myRow[4]=='B'){
//       console.log(myRow[0]+'_'+myRow[1]+'_'+size2[j]+','+myRow[j]);
//     }
//     else{
//       console.log(myRow[0]+'_'+myRow[1]+'_'+size3[j]+','+myRow[j]);
//     }
//     }
//   }


//   }
  
// };

// xls('Skechers sample.xlsx', function(err,data) {
//     if(err) throw err;
//     //console.log(jsonDataArray(data));
//     console.log('SKU \t Qty');
//     JSON.stringify(convertToJSON(data));
// });

var xls = require('excel');
var fs = require('fs');

function skechersParser(Sourcefilename, outputfilename, callback){
  var cleanFilename = outputfilename.substr(0, outputfilename.lastIndexOf('.'));

var exportToCSV = fs.createWriteStream('./public/files/'+cleanFilename+'.csv');
  exportToCSV.write('SKU,Qty\n');


  function convertToJSON(array) {
    
    var size = array[0].join().trim().split(',');
    var size2 = array[1].join().trim().split(',');
    var size3 = array[2].join().trim().split(',');

    for ( var i = 1; i < array.length; i++ )
    {
     
      var myRow = array[i].join().split(',');
      //var row = myRow.split(',');
    for(var j=5; j<myRow.length; j++){
      if(!isNaN(myRow[3]) && myRow[3]!='' && myRow[j]!=''){
        if(myRow[4]=='A'){
        console.log(myRow[0]+'_'+myRow[1]+'_'+size[j]+','+myRow[j]);
        exportToCSV.write(myRow[0]+'_'+myRow[1]+'_'+size[j]+','+myRow[j] +"\n");

      }else if(myRow[4]=='B'){
        console.log(myRow[0]+'_'+myRow[1]+'_'+size2[j]+','+myRow[j]);
        exportToCSV.write(myRow[0]+'_'+myRow[1]+'_'+size2[j]+','+myRow[j] +"\n");
      }
      else{
        console.log(myRow[0]+'_'+myRow[1]+'_'+size3[j]+','+myRow[j]);
        exportToCSV.write(myRow[0]+'_'+myRow[1]+'_'+size3[j]+','+myRow[j] +"\n");
      }
      }
    }

    }
    callback();
    
  }


  //
  xls('./uploads/'+Sourcefilename, function(err,data) {
      if(err) throw err;
      //console.log(jsonDataArray(data));
      console.log('SKU,Qty');
      JSON.stringify(convertToJSON(data));
  });
}


//outputfilename = 'Skechers sample.xlsx';


module.exports = skechersParser;