var request = require("request");
var moment = require('moment');



var options = {
    method: 'POST',
    url: 'https://dropship.obermeyer.com/api/ats',
    headers:
    {
        'cache-control': 'no-cache',
        accept: 'application/json',
        'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
    },
    formData:
    {
        u: 'MAYODS35762',
        p: 'KQgajEmHdeWmWabGfzXz',
        season: '2017-18,2016-17,2015-16,2014-15,2013-12'
    }
};

function WriteToFile(items, callback){
    
    var fname = 'Obermeyer-ATS-'+moment().format()+'.csv';
    var fs = require('fs');
    var stream = fs.createWriteStream('./public/files/'+fname);
    stream.once('open', function(fd) {
        stream.write("UPC,SEASON,ATS\n");
        for (var i = 0; i < items.length; i++) {
            stream.write(
                '="'+items[i].UPC+'",'
                +items[i].SEASON+","
                +items[i].ATS+"\n"
            );
        }
        stream.end();
    });
    console.log('File written to "obermeyer inventory.csv".');
    callback(fname);
}

function obermeyerAPI(callback){
    
    console.log('requesting inventory...');
    var items;
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        //console.log(body);
        items = JSON.parse(body);

        console.log(items.length + " Items found.");
       // console.log(items);

        WriteToFile(items, function(filename){
            callback(filename);
        }); // write data by calling function write to file.

        // for (var i = 0; i < items.length; i++) {
        //     console.log(items[i].UPC);
        // }
    });
    return items;
}


//items = GetItemsRequest();
//WriteToFile(items);

module.exports = obermeyerAPI;