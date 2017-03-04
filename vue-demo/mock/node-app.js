var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes/');
var notFound = require('./middlewares/notFound');
var simpleLogger = require('./middlewares/simpleLogger');
var resAjaxReturn = require('./middlewares/res.ajaxReturn');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(simpleLogger);
app.use(resAjaxReturn);

// 根据app.<verb>(<path>, <[middlewares]?>, <handler>) 挂载路由
routes.forEach(function (route) {
  var args = [route.path];
  if (route.middlewares) args.push(route.middlewares);
  args.push(route.handler);

  app[route.method.toLowerCase()].apply(app, args);
});

app.use(notFound);
module.exports = app;
