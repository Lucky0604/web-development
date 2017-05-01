/*
 * @Author: Lucky 
 * @Date: 2017-05-01 16:29:25 
 * @Last Modified by: Lucky
 * @Last Modified time: 2017-05-01 19:06:43
 */
import express from 'express'
import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import session from 'express-session'
import compression from 'compression'
import connectMongo from 'connect-mongo'
import routers from './routers'
import $ from './utils'
import models from './models'
const app = express()
const MongoStore = connectMongo(session)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(compression())
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public/api/')))
if ($.isDev === false) {
  app.use($.logAccess)
}

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', $.config.allowOrigin)
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, content-type')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

app.use(session({
  secret: $.config.secret,
  store: new MongoStore({
    url: $.config.sessiondb
  }),
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 24 * 30
  },
  saveUninitialized: false,
  resave: false
}))

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    msg: err.message,
    err: err
  })
})

// create user
const createUser = async () => {
  const id = '123454321'
  const exist = await models.OBJ.UserModel.find({openid: id})
  if (exist) {
    return 
  }

  const user = await models.OBJ.UserModel.create({
    nickname: id,
    openid: id,
    email: {addr: `${id}@qq.com`},
    password: id,
    permission: ['dev'],
    code: id,
    company: 'Dev account'
  })
}

createUser()

// routes
app.use('/api/mobile/obj', routes.OBJ)
app.use('/api/admin', routes.admin)
models.connect()

console.log('===================================')
console.log('CMS API START AT' + $.dateFormat(new Date()))
console.log('====================================')
export default app