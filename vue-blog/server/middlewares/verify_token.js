'use strict';

const utils = require('../utils/index.js');
const config = require('../config/index.js');
const jwt = require('jsonwebtoken');

module.exports = function *(next) {
  const authorization = this.get('Authorization');
  if ('' === authorization) {
    this.throw(401, 'no token detected in http header \'Authorization\'');
  }
  const token = authorization.split(' ')[1];
  let tokenContent;
  try {
    tokenContent = yield jwt.co_verify(token, config.jwt.cert);
  } catch(err) {
    if ('TokenExpiredError' === err.name) {
      this.throw(401, 'token expired');
    }
    this.throw(401, 'invalid token');
  }
  utils.print("验证通过");
  this.token = tokenContent;
  return yield next;
}
