export default {
  '/auth/login': {
    title: '登录',
    icon: 'fa fa-sign-in',
    component (resolve) {
      require(['VIEW/auth/login'], resolve)
    },
    forbidAuthed: true
  },

  '/auth/logout': {
    title: '注销登录',
    icon: 'fa fa-sign-out',
    component (resolve) {
      require(['VIEW/auth/logout'], resolve)
    },
    needAuth: true
  }
}
