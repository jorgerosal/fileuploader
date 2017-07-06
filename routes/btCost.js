var express = require('express');
var router = express.Router();
var multer  = require('multer');
//var upload = multer({ dest: 'uploads/' })
var getBtCost = require("./../core/btcostlookup/getBtCost");


 var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        }
    });

    var upload = multer({ //multer settings
                    storage: storage
                }).single('file');




router.get('/', function(req, res) {
  res.render('btCost', { title: 'BT Cost Lookup' });

});

router.post('/', upload, function (req, res, next){
    console.log(req.file);
    var ff = req.file.originalname;
    var chocho = ff.substr(0, ff.lastIndexOf('.'))+'.txt';
    console.log('skechers was here');
    //res.send("file received");
   // res.render('success', { fname: chocho});
    getBtCost(req.file.filename, req.file.originalname, function(){
        res.render('success', { fname: chocho});
    });
});

module.exports = router;


