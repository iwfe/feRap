'use strict';

import Router from 'koa-router'

import main from './controller/main.js'
import user from './controller/user.js'

const routes = new Router()

// main
routes.get('/index', main.index)

// 用户信息
routes.get('/login', user.login)
routes.post('/login', user.toLogin)
routes.get('/regist', user.regist)
routes.post('/regist', user.toRegist)

module.exports = routes
