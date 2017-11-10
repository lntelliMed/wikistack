var express = require("express");
var morgan = require("morgan");
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var router = require('./routes');
var app = express();

app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', {noCache: true});

app.use(morgan("dev"));

app.use(express.static('./public'));

app.use('/', router);

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.listen(3000, function(){
  console.log("Server started..")
});
