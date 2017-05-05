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
routes.get('/team/getTeamsTree.json', team.getTeamsTree)
routes.get('/team/getTeamList.json', team.getTeamList)
routes.post('/team/data', team.addTeam)
routes.put('/team/data', team.updateTeam)
routes.get('/team/data', team.findTeamById)
routes.del('/team/data', team.deleteTeam)

module.exports = routes
