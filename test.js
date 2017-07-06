var mysql = require('mysql');
var counter = 0;

var connection = mysql.createConnection(
    { 
      host     : 'mrisdbinstance.crhcghnub9gg.us-east-1.rds.amazonaws.com',
      user     : 'Jorge',
      password : 'T3fskvk4ELd',
      database : 'feedcake',
    }
);
 
//connection.connect();

function connectDB(){
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  } 
  console.log('  (Database connection established.. ID: ' + connection.threadId+')');
});
}

function queryBtCost(skuData, callback){
   connectDB();
  var query = 'select cost from feedcake.inventory where sku = "'+skuData + '"';

  connection.query(query, function(err, rows, fields) {
      if (err) throw err;
    console.log(rows[0].cost);
    

    outDB();
        
  });
}


function outDB(){
  connection.end(function(err) {
    // The connection is terminated now 
    if (err) throw err;
   
    console.log('  (Database Connection Closed)');
  });
}


function chocho(){
  console.log("yohoo!");
}


queryBtCost("32241-13-EE");



//  module.exports.connectDB = connectDB;
//  module.exports.queryBtCost = queryBtCost;
//  module.exports.outDB = outDB;

//  module.exports.chocho = chocho;

//module.exports = query;
