var express = require('express');
var router = express.Router();
var multer  = require('multer')
//var upload = multer({ dest: 'uploads/' })


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



/* GET parser page. */
//router.get('/', function(req, res, next) {
//  res.render('parser', { title: 'Parser' });
//});

router.get('/', function(req, res) {
  res.render('parser', { title: 'Data Parser' });
});



router.post('/', function(req, res) {
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
        });
    });


/*
router.post('/', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file 
  // req.body will hold the text fields, if there were any 
   console.dir(req.files);
})*/

module.exports = router;




    /** API path that will upload the files */
