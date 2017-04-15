/**
 * @Author: lucky
 * @Date:   2017-04-15T13:12:07+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-15T13:36:52+08:00
 */



const router = require('koa-router')()
const frontendArticle = require('../service/frontend-article')
const frontendComment = require('../service/frontend-comment')
const frontendLike = require('../service/frontend-like')
const frontendUser = require('../service/frontend-user')
const isUser = require('../middlewares/user')

/**
 * 前台用户API
 */

// --------------------文章---------------------
// 前台浏览时获取文章
router.get('/article/list', frontendArticle.getList)
// 前台浏览时获取单个文章
router.get('/article/item', frontendArticle.getItem)
// 前台浏览时热门文章
router.get('/trending', frontendArticle.getTrending)

// --------------评论管理-------------------
// 发布评论
router.post('/comment/add', isUser, frontendComment.addComment)
// 读取评论列表
router.get('/comment/list', frontendComment.getList)

// -------------用户管理-------------------
// 用户注册
router.post('/user/add', frontendUser.addUser)
// 用户登陆
router.post('/user/login', frontendUser.login)
// 用户退出
router.post('/user/logout', isUser, frontendUser.logout)
// 用户帐号信息
router.get('/user/account', isUser, frontendUser.getItem)
// 修改用户帐号
router.post('/user/account', isUser, frontendUser.account)
// 修改用户密码
router.post('/user/password', isUser, frontendUser.password)

// --------------点赞----------------------
// 点赞
router.get('/like', isUser, frontendLike.like)
// 取消赞
router.get('/unlike', isUser, frontendLike.unlike)

module.exports = router
