var express = require('express');
var router = express.Router();
var multer  = require('multer')
//var upload = multer({ dest: 'uploads/' })
var globeParser = require("./../core/globeParser");


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
  res.render('globe', { title: 'Data Parser' });
  //globeParser(sourcefilename, 'Sheet1', outputfilename);

});


router.post('/', upload, function (req, res, next){
    console.log(req.file);
    var ff = req.file.originalname;
    var chocho = ff.substr(0, ff.lastIndexOf('.'))+'.csv'
    console.log('globe was here');
    //res.send("file received");
    res.render('success', { fname: chocho});
    globeParser(req.file.filename, req.file.originalname);
})

module.exports = router;



    /** API path that will upload the files */


    
/*
router.post('/', function(req, res) {
    //var files = req.files
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
             res.sendStatus(200);
        });
        console.log('Im here at post production');
        //console.log(req.files);
       // res.sendStatus(200);
    });*/
