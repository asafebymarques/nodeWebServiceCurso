var express = require('express');
var load = require('express-load');
var cors = require('cors');

var app = express();
var bodyParser = require('body-parser');

app.use(cors());

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type,Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

var mongoose = require('mongoose');

global.db = mongoose.createConnection('mongodb://localhost:27017/cursos');

load('models').into(app);

var Curso = app.models.curso;


//métodos do servico
app.get('/', function(request, response){
  response.send('Servidor no ar');
});

app.get('/cursos', function(request, response){
  Curso.find(function(erro, cursos){
    if(erro){
      response.json(erro);
    } else {
      response.json(cursos);
    }
  });
});

app.post('/cursos', function(request, response){
  var codigo = request.body.codigo;
  var descricao = request.body.descricao;
  var ch = request.body.ch;

  var curso = {
    'codigo': codigo,
    'descricao': descricao,
    'ch': ch
  };

  Curso.create(curso, function(erro, curso){
    if(erro){
      response.json(erro);
    } else {
      response.json(curso);
    }
  });
});

app.listen(3200, function(){
  console.log('Servidor OK');
});



