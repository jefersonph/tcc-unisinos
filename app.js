var express = require('express');
var app = express();
var http = require('http');
var path = require('path');


app.engine('.html', require('ejs').__express);
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views');
app.set('view engine', 'html');


app.get('/', function(req, res){
    res.redirect('/signin');
});

app.get('/email', function(req, res){
    res.render('email');
});

app.get('/friends', function(req, res){
    res.render('friends');
});

app.get('/games', function(req, res){
    res.render('games');
});

app.get('/account', function(req, res){            
    res.render('account');
});

app.get('/signin', function(req, res){
    res.render('signin')
});

app.get('/profile', function(req, res){
    res.render('profile')
});

app.get('/loan', function(req, res){
    res.render('loan')
});

app.get('/requestGame', function(req, res){
    res.render('requestGame')
});

app.get('/yourLoans', function(req, res){
    res.render('yourLoans')
});

var port = Number(process.env.PORT || 4000);

app.listen(port, function() {
  console.log("Listening on " + port);
});