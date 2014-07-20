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

app.get('/estados', function(req, res){
    res.render('estados');
});

app.get('/mapa', function(req, res){
    res.render('mapa');
});

app.get('/informacoes', function(req, res){
    res.render('informacoes');
});

app.get('/doencas', function(req, res){
    res.render('doencas');
});

app.get('/info_pessoais', function(req, res){
    res.render('info_pessoais/info');
});

app.get('/info_doencas', function(req, res){
    res.render('info_pessoais/doencas');
});

app.get('/adicionar_doenca', function(req, res){
    res.render('info_pessoais/adicionar_doenca');
});

app.get('/adicionar_remedio', function(req, res){
    res.render('info_pessoais/adicionar_remedio');
});

app.get('/info_remedios', function(req, res){
    res.render('info_pessoais/remedios');
});

app.get('/adicionar_alergia', function(req, res){
    res.render('info_pessoais/adicionar_alergia');
});

app.get('/info_alergias', function(req, res){
    res.render('info_pessoais/alergias');
});

app.get('/estado', function(req, res){
    res.render('estados/estado');
});


app.get('/aids', function(req, res){
    res.render('doencas/aids');
});

app.get('/dengue', function(req, res){
    res.render('doencas/dengue');
});

app.get('/tuberculose', function(req, res){
    res.render('doencas/tuberculose');
});

app.get('/leptospirose', function(req, res){
    res.render('doencas/leptospirose');
});

app.get('/aids_detalhe', function(req, res){
    res.render('doencas/aids_detalhe');
});

var port = Number(process.env.PORT || 4000);

app.listen(port, function() {
  console.log("Listening on " + port);
});