var express = require('express');
var router = express.Router();

var obermeyerAPI = require("./../core/obermeyerAPI");


router.get('/', function(req, res) {
  
  //res.render('success', { fname: "Parsed!"});
 // res.render('btCost', { title: 'BT Cost Lookup' });
  
  obermeyerAPI(function(filename){
        res.render('success', { fname: filename});
    });
  


});


module.exports = router;
