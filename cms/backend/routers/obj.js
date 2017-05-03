/**
 * @Author: lucky
 * @Date:   2017-04-30T17:36:47+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-30T21:40:04+08:00
 */



import express from 'express'
import api from '../api'
import auth from '../utils/auth'
import $ from '../utils'

const authToken = auth.authToken
const router = express.Router()
const {OBJ} = api

// users
router.post('/user/login', OBJ.User.login)
router.post('/user/verify', OBJ.User.verify)

// articles
router.get('/articles', OBJ.Article.all)
router.get('/article/:id', OBJ.Article.find)
router.get('/articles/myArticles', OBJ.Article.myArticles)
router.get('/articles/myComments', OBJ.Article.myComments)

// votes
router.get('/votes', OBJ.Vote.all)
router.get('/vote/:id', OBJ.Vote.find)
router.get('/votes/myVotes', OBJ.Vote.myVotes)
router.get('/votes/myComments', OBJ.Vote.myComments)

export default router