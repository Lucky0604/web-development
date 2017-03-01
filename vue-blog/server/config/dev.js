module.exports = {
  env: 'development',
  debug: true,
  mongoConfig: {
    url: 'mongodb://localhost:27017/vue-blog-dev',
    opts: {
      user: '',
      pass: ''
    }
  },
  'jwt': {
    'cert': 'vue-blog-dev'
  }
}
