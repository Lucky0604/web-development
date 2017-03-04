var fs = require('fs-extra');
var webpack = require('webpack');
var gulp = require('./gulpfile');
var PATHS = require('./config/PATHS');
var config = require('./webpack.prod.conf');

fs.emptyDirSync(PATHS.DIST);      // 清空build目录
fs.copySync(PATHS.STATIC, PATHS.DIST.join('static'));     // 复制高度静态资源

webpack(config, function(err, stats) {
  // show build info to console
  console.log(stats.toString({chunks: false, color: true}));

  // bundle plugins
  gulp.start('default');
})
