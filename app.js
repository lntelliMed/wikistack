var express = require("express");
var morgan = require("morgan");
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var router = require('./routes');
var models = require('./models');
var app = express();

app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', {noCache: true});

app.use(morgan("dev"));
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);


// app.listen(3000, function(){
//   console.log("Server started..")
// });


// Where your server and express app are being defined:
// ... other stuff
models.User.sync({ force: true })
  .then(function () {
    return models.Page.sync({ force: true })
  })
  .then(function () {
    // make sure to replace the name below with your express app
    app.listen(3000, function () {
      console.log('Server is listening on port 3000!');
    });
  })
  .catch(console.error);
