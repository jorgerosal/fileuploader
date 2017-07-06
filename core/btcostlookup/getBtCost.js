
var query = require("./query");
var fs = require('fs');



function getBtCost(Sourcefilename, outputfilename, callback){ //run once
  //var cleanFilename = outputfilename.substr(0, outputfilename.lastIndexOf('.'));
  
  var exportToCSV = fs.createWriteStream('./public/files/'+outputfilename);


   var x = 10;
   var row = 1;
   var linetotal = 0;
  
   var readline = require('linebyline');
        var rl = readline('./uploads/'+Sourcefilename);
        rl.on('line', function(line, lineCount, byteCount) {
              console.log(lineCount);
              linetotal = lineCount;
  })
  .on('line', function(line, lineCount, byteCount) {
              //data.push(line);
          setTimeout(function() {
             if(row == 0){ // row was just used as indicator initial value is 1
              // console.log(line)
                query.queryBtCost(line, function(result){
                  console.log(line+'\t'+result+'\t'+linetotal+'\t'+lineCount+'\n');
                  exportToCSV.write(line+'\t'+result+'\t'+linetotal+'\n');
                  
                  if(lineCount ==linetotal){
                    callback();
                    query.outDB();
                    console.log('done');
                  }
                  
                });

              } else{
                console.log('firstline ignore');
                
                console.log(line+'\t"Cost"\n');
                exportToCSV.write(line+',"Cost"\n');

              }
              row = 0;
              

             //console.log('line '+x)
          }, x);
          x = x + 20;

  })
  .on('error', function(e) {
      console.log('error: '+ e);
    // something went wrong
  });

}


//getBtCost('sample.txt');

module.exports = getBtCost;