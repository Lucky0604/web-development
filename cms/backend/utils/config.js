var isDev = process.env.NODE_ENV === 'dev'

module.exports = {
  isDev: isDev,
  ports: isDev ? ['3000']: ['10000'],
  secret: '*',
  allowOrigin: 'http://127.0.0.1:8080',
  db: 'mongodb://127.0.0.1:27017/vue-cms',
  testdb: 'mongodb://127.0.0.1:27017/vue-cms-test',
  sessiondb: 'mongodb://127.0.0.1:27017/vue-cms-session',
  qiniu: {
    bucket: '*',
    ACCESS_KEY: '*',
    SECRET_KEY: '*'
  },
  jpush: {
    ACCESS_KEY: '******',
    SECRET_KEY: '******'
  },
  cookie: {
    domain: 'http://127.0.0.1',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    signed: true
  },
  log: {
    appenders: [{
      layout: {
        type: 'pattern',
        pattern: '%[%d %-5p %-6c(%x{pid})%] - %m',
        tokens: {
          pid: process.pid
        }
      },
      type: 'console'
    }, {
      layout: {
        type: 'pattern',
        pattern: '%d %-5p (%x{pid}) - %m',
        tokens: {
          pid: process.pid
        }
      },
      type: 'file',
      filename: 'log/debug.log',
      category: 'debug'
    }, {
      layout: {
        type: 'pattern',
        pattern: '%d %-5p (%x{pid}) - %m',
        tokens: {
          pid: process.pid
        }
      },
      type: 'dateFile',
      filename: 'log/access',
      category: 'access',
      pattern: '_yyyy-MM-dd.log',
      alwaysIncludePattern: true
    }]
  }
}