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