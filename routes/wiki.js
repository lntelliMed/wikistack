var express = require('express');
var models = require('../models');
var Page = models.Page;
var User = models.User;
var router = express.Router();

router.get('/', function (req, res, next) {
  Page.findAll()
  .then(function (foundPages) {
    res.render('index', { pages: foundPages });
    // console.log(foundPages.dataValues)
  })
  .catch(next);


  // res.send('got to GET /wiki/');
});

router.post('/', function (req, res, next) {
  let name = req.body.name;
  let email = req.body.email;
  let title = req.body.title;
  let content = req.body.content;
  let status = req.body.status;

  User.findOrCreate({
    where: {
      email: email,
      name: name
    }
  })
  .then(function (values) {

    var user = values[0];

    var page = Page.build({
      title: req.body.title,
      content: req.body.content
    });

    return page.save().then(function (wikiPage) {
      return wikiPage.setAuthor(user);
    });

  })
  .then(function (data) {
    res.redirect(`./${data.urlTitle}`);
  })
  .catch(next);
});

router.get('/add', function (req, res, next) {
  res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next) {

  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function (foundPage) {
    foundPage.getAuthor().then((author) => {
      console.log(">>>>>>>>>>>>>>>>>>> " + author.name)
      res.render('wikipage', { foundPage: foundPage.dataValues, user: author });

    });
  })
  .catch(next);

});

module.exports = router;
