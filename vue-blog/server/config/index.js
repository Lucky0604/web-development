'use strict';

const path = require('path');
const serverRoot = path.dirname(__dirname);
// path.resolve() method resolves a sequence of paths or path segments into an absolute path
const root = path.resolve(serverRoot, '../');
const staticDir = path.join(root, 'static');
const dev = require('./dev.js');
const fs = require('fs');
const _ = require('lodash');

// 默认生产环境
let config = {
  app: {
    name: 'vue-blog',
    port: 3000,
    adminPath: '/api'   // 后台路径
  },
  debug: false,
  env: 'production',
  mongoConfig: {    // 数据库配置
    url: 'mongodb://localhost:27017/vue-blog',
    opts: {
      user: '',
      pass: ''
    }
  },
  'jwt': {
    'cert': 'vue-blog'
  },
  dir: {    // 目录配置
    root,
    log: path.join(__dirname, '..', 'logs'),
    server: serverRoot,
    static: staticDir,
    resource: path.join(serverRoot, 'resource'),
    upload: path.join(serverRoot, 'resource', 'upload')
  },
};
// 本地调试环境
if (process.env.NODE_ENV === 'development') {
  config = _.merge(config, dev);
}

// 私有配置
if (process.env.NODE_ENV === 'production') {
  if (fs.existsSync(__dirname + '/production.js')) {
    config = _.merge(config, require('./production.js'));
  }
}

module.exports = config;
