/**
 * @Author: lucky
 * @Date:   2017-05-01T11:43:43+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-05-01T16:11:56+08:00
 */



import express from 'express'
import Admin from '../admin'
import auth from '../utils/auth'

const authSession = auth.authSession
const router = express.Router()

// User
router.get('/users', authSession, Admin.User.all)
router.route('/user/:id', authSession)
  .get(Admin.User.find)
  .post(Admin.User.create)
  .put(Admin.User.update)
  .delete(Admin.User.delete)

router.post('/account/login', Admin.User.login)
router.post('/account/logout', Admin.User.logout)
router.post('/account/resetPassword', authSession, Admin.User.resetPassword)

// Articles
router.get('/articles', authSession, Admin.Article.all)
router.get('/article/:id', authSession, Admin.Article.find)
router.post('/article', authSession, Admin.Article.create)
router.put('/article/update/index', authSession, Admin.Article.updateIndex)
router.put('/article/:id', authSession, Admin.Article.update)
router.delete('/article/:id', authSession, Admin.Article.delete)

// Vote
router.get('/votes', authSession, Admin.Vote.vote.all)
router.post('/vote', authSession, Admin.Vote.vote.create)
router.route('/vote/:id', authSession)
  .get(Admin.Vote.vote.find)
  .put(Admin.Vote.vote.update)
  .delete(Admin.Vote.vote.delete)

// Vote Record
router.get('/voterecords', authSession, Admin.Vote.record.all)
router.post('/voterecord', authSession, Admin.Vote.record.create)
router.route('/voterecord/:id', authSession)
  .get(Admin.Vote.record.find)
  .put(Admin.Vote.record.update)
  .delete(Admin.Vote.record.delete)

// Comment
router.get('/comments', authSession, Admin.Comment.all)
router.route('/comment/:id', authSession)
  .get(Admin.Comment.find)
  .post(Admin.Comment.create)
  .put(Admin.Comment.update)
  .delete(Admin.Comment.delete)

// qiniu upload token
router.get('/services/uptoken', authSession, Admin.Service.uptoken)

// search
router.get('/search', authSession, Admin.Search)

// statistic
router.get('/statistics/total', authSession, Admin.Statistics.total)

export default router