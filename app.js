var express = require('express');
var app = express();
var http = require('http');
var path = require('path');


app.engine('.html', require('ejs').__express);
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views');
app.set('view engine', 'html');


app.get('/', function(req, res){
    res.render('index');
});

app.get('/telefones', function(req, res){
    res.render('telefones');
});

app.get('/vacinas', function(req, res){
    res.render('vacinas');
});

app.get('/prevencao', function(req, res){
    res.render('prevencao');
});

app.get('/cuidados', function(req, res){
    res.render('cuidados');
});

app.get('/consulados', function(req, res){
    res.render('consulados');
});
var port = Number(process.env.PORT || 4000);

app.listen(port, function() {
  console.log("Listening on " + port);
});