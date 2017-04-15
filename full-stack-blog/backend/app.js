/**
 * @Author: lucky
 * @Date:   2017-04-13T12:18:10+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-15T12:26:19+08:00
 */



const path = require('path')
const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
const views = require('koa-views')
const convert = require('koa-convert')
const json = require('koa-json')
const bodyParser = require('koa-bodyparser')()
const logger = require('koa-logger')

// 引入mongoose相关模型
require('./server/models/admin')
require('./server/models/article')
require('./server/models/category')
require('./server/models/comment')
require('./server/models/like')
require('./server/models/user')

const index = require('./server/routes/index')

// middlewares
app.use(convert(bodyParser))
app.use(convert(json()))
app.use(convert(logger()))
app.use(convert(require('koa-static')(path.join(__dirname, 'public'))))

app.use(views(path.join(__dirname, 'views'), {extension: 'ejs'}))

// logger

app.use(async(ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  if (ctx.status === 404) {
    const err = new Error('Not Found')
    err.status = 404
    ctx.body = {
      tag: 'error',
      status: err.status,
      message: err.message,
      stack: err.stack
    }
  }
})


app.use(require('./server/middlewares/return'))

app.use(index.routes(), router.allowedMethods())

app.on('error', function (err, ctx) {
  console.error('server error', err, ctx)
})

module.exports = app
