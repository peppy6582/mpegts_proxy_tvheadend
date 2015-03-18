var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var jf = require('jsonfile');
var settings = './public/settings.json';
var sources = './examples/sources.json';

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/',function(req,res){

});

app.get('/examples/get',function(req,res){
    jf.readFile(sources, function(err, obj) {
        console.log(obj)
    })

    res.sendfile(sources);
});

app.post('/examples/put', function(req,res){

    var obj = JSON.parse(fs.readFileSync(sources, 'utf8'));
    console.log(res);
/*

    jf.writeFile(sources, obj, function(err) {
        console.log(err)
    })*/

});

var server = function(){
    app.listen(9127);
};

var exports = module.exports = {};
exports.server = server;
