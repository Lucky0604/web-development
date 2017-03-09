/**
 * Created by lucky on 3/9/17.
 *
 * 为生产环境进行编译配置
 */

// https://github.com/shelljs/shelljs
require('shelljs/global')
// 设置运行环境为'production'
env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('./webpack.prod.conf')
