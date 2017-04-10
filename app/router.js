'use strict';

import Router from 'koa-router'

import main from './controller/main.js'
import user from './controller/user.js'

const routes = new Router()

// main
routes.get('/index', main.index)

// 用户信息
routes.get('/user/login', user.login)
routes.get('/user/addUser', user.addUser)

module.exports = routes
