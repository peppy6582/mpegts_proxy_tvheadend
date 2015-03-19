var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var jf = require('jsonfile');
var settings = './public/settings.json';
var sources = './examples/sources.json';

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/',function(req,res){

});

app.get('/examples/get',function(req,res){
    jf.readFile(sources, function(err, obj) {
        console.log(err)
    });

    res.sendfile(sources);
});

app.post('/examples/put', function(req,res){

    jf.writeFile(sources, req.body, function(err) {
        console.log(err);
    });

    res.sendfile(sources);

});

var server = function(){
    app.listen(9127);
};

var exports = module.exports = {};
exports.server = server;
