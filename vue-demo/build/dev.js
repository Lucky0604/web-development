var express = require('express');
var webpack = require('webpack');
var PATHS = require('./config/PATHS');
var PORTS = require('./config/PORTS');
var config = require('./webpack.dev.conf');
var proxy = require('http-proxy-middleware');
var app = express();

var compiler = webpack(config);

// 提供静态资源
app.use('/static', express.static(PATHS.STATIC));

// mock server
require(PATHS.MOCK.join('node-app')).listen(PORTS.MOCK_SERVER);
app.use('/api', proxy({
  target: 'http://127.0.0.1:' + PORTS.MOCK_SERVER,
  changeOrigin: true,
  pathRewrite: {
    // 重写URL: [DEV server]/api/xxx <=> [Mock server]/xxx
    '^/api': '/'
  }
}));

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// server webpack bundle output
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

// enable hot-reload and state-preserving
// compilation error display
app.use(require('webpack-hot-middleware')(compiler));

app.listen(PORTS.DEV_SERVER);
