'use strict';

import Router from 'koa-router'

import main from './controller/main'
import user from './controller/user'
import team from './controller/team'

const routes = new Router()

// main
routes.get('/index', main.index)

// 用户信息
routes.get('/login', user.login)
routes.post('/login', user.toLogin)
routes.get('/regist', user.regist)
routes.post('/regist', user.toRegist)

// team
console.log(team.getTeamsTree);
routes.get('/team/getTeamsTree.json', team.getTeamsTree)


module.exports = routes
