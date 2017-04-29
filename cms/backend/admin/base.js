/**
 * @Author: lucky
 * @Date:   2017-04-29T18:17:18+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-29T18:30:55+08:00
 */



import $ from '../utils'

export default class Base {
  constructor (options) {
    this.model = options.model || {}
    this.search = options.search || {}
    this.methods = addMethods(this)
  }
}

function addMethods(_this) {
  let methods = {}
  methods.find = async function (req, res, next) {
    $.result(res, await _this.model.findById(req.params.id))
  }

  methods.all = async function (req, res, next) {
    let query = {}
    let search = req.query.search
    if (!$.isEmpty(search)) {
      query[_this.search] = new RegExp(search)
    }
    $.result(res, await _this.model.all(query, req.query.start))
  }

  methods.create = async function (req, res, next) {
    $.result(res, await _this.model.create(query))
  }

  methods.update = async function (req, res, next) {
    let exist = await _this.model.find({'_id': req.params.id})
    if (exist.openid === '123454321') {
      $.result(res, 'this is test account')
      return
    }
    let documents = await _this.model.update({'_id': req.params.id}, req.body)
    if (documents === -1) {
      $.result(res, 'update failed')
    } else {
      $.result(res, documents)
    }
  }

  methods.delete = async function (req, res, next) {
    let documents = await _this.model.delete({'_id': req.params.id})
    if (documents === -1) {
      $.result(res, 'delete failed')
    } else {
      $.result(res, documents)
    }
  }

  methods.addSchedule = async function (req, res, next) {
    let params = Object.assign({user: req.session.user._id}, req.body)
    if (params.status !== 'schedule') {
      params.sendAt = Date.now()
    }
    let documents = await _this.model.create(params)
    if (documents === -1) {
      return $.result(res, 'params error')
    }
    if (params.status === 'schedule') {
      let j = $.job.add(new Date(params.sendAt), function () {
        _this.model.update({'_id': documents._id}, {status: 'send'})
      })
      _this.model.update({'_id': documents._id}, {job: j})
    }
    $.result(res, documents)
  }
  return methods
}
