window._ = require('lodash');     // lowdb依赖

var tinyExpress = require('tiny-express');
var qs = require('query-string');
var routes = require('./routes/');
var notFound = require('./middlewares/notFound');
var simpleLogger = require('./middlewares/simpleLogger');
var resAjaxReturn = require('./middlewares/res.ajaxReturn');

var app = tinyExpress();
app.use(simpleLogger);
app.use(resAjaxReturn);
app.use(routes);
app.use(notFound);

/**
 * 通过重写xhr接口来实现运行在浏览器的mock server，以支持纯静态页面展示
 *
 * @param {String} reqBody.method
 * @param {String} reqBody.url
 * @param {Object} reqBody.body
 * @return {Promise}
 */
var xhr = function (reqBody) {
  console.group('Mock Server');
  var method = (reqBody.method || 'GET').toUpperCase();
  var body = reqBody.body;
  var url = reqBody.url;
  var urlSplit = url.split('?');
  var path = urlSplit[0];
  var query = qs.parse(urlSplit[1]);

  if (method === 'GET' && body) {
    Object.assign(query, body);

    var queryStr = qs.stringify(query);
    url = queryStr ? path + '?' + queryStr : url;
  }

  return new Promise(function (resolve) {
    app.receive({
      method: method,
      url: url,
      body: body || {}
    }).respond(function (re) {
      if (typeof re === 'string') re = JSON.parse(re);
      if (!re.success) return alert(re.errMsg);
      resolve(re.data);
      console.groupEnd('Mock Server');
    })
  })
}

module.exports = xhr;
