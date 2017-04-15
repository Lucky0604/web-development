/**
 * @Author: lucky
 * @Date:   2017-04-14T17:23:26+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-15T12:00:09+08:00
 */



const router = require('koa-router')()

const backendArticle = require('../service/backend-article')
const backendCategory = require('../service/backend-category')
const backendUser = require('../service/backend-user')

const frontendComment = require('../service/frontend-comment')
const frontendUser = require('../service/frontend-user')
const isAdmin = require('../middlewares/admin')

/**
 * APIs
 * ========backend api=========
 */

// ----------文章管理--------------
// 管理员获取文章
router.get('/article/list', isAdmin, backendArticle.getList)
// 管理员获取单个文章
router.get('/article/item', isAdmin, backendArticle.getItem)
// 管理员发布文章
router.post('/article/add', isAdmin, backendArticle.addItem)
// 管理员删除文章
router.get('/article/delete', isAdmin, backendArticle.deleteItem)
// 管理员恢复文章
router.get('/article/recoverItem', isAdmin, backendArticle.recoverItem)
// 管理员编辑文章
router.post('/article/modifyItem', isAdmin, backendArticle.modifyItem)


// ----------分类管理---------------
// 管理员获取分类列表
router.get('/category/list', backendCategory.getList)
// 管理员获取单个分类
router.get('/category/item', backendCategory.getItem)
// 管理员添加分类
router.post('/category/add', isAdmin, backendCategory.addItem)
// 管理员删除分类
router.get('/category/delete', isAdmin, backendCategory.deleteItem)
// 管理员恢复分类
router.get('/category/recover', isAdmin, backendCategory.recoverItem)
// 管理员编辑分类
router.post('/category/modify', isAdmin, backendCategory.modifyItem)

// -----------管理员管理------------
// 管理员登录
router.post('/admin/login', backendUser.loginAdmin)
// 管理员列表
router.get('/admin/list', isAdmin, backendUser.getList)
// 获取单个管理员
router.get('/admin/item', isAdmin, backendUser.getItem)
// 编辑管理员
router.post('/admin/modify', isAdmin, backendUser.modifyAdmin)
// 删除管理员
router.get('/admin/delete', isAdmin, backendUser.deleteAdmin)
// 恢复管理员
router.get('/admin/recover', isAdmin, backendUser.recoverAdmin)

// -------------用户管理------------
// 获取用户列表
router.get('/user/list', isAdmin, frontendUser.getList)
// 获取单个用户
router.get('/user/item', isAdmin, frontendUser.getItem)
// 编辑用户
router.post('/user/modify', isAdmin, frontendUser.modifyItem)
// 删除用户
router.get('/user/delete', isAdmin, frontendUser.deleteItem)
// 恢复用户
router.get('/user/recover', isAdmin, frontendUser.recoverItem)

// -----------评论管理--------------
// 删除评论
router.get('/comment/delete', isAdmin, frontendComment.deleteComment)
// 恢复评论
router.post('/comment/recover', isAdmin, frontendComment.recoverComment)

module.exports = router
