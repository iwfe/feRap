'use strict';

import Router from 'koa-router'

import main from './controller/main'
import user from './controller/user'
import team from './controller/team'
import prj from './controller/prj'
import api from './controller/api'
import prd from './controller/prd'

const routes = new Router()

// main
routes.get('/', main.index)

// 用户信息
// routes.get('/login', user.login)
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

routes.get('/team/getAllTeamList.json', team.getAllTeamList)
routes.get('/team/joinIntoTeam.json', team.joinIntoTeam)
routes.get('/team/quitFromTeam.json', team.quitFromTeam)

// project
routes.get('/project/getPrjList.json', prj.getPrjList)
routes.post('/project/data', prj.addPrj)
routes.put('/project/data', prj.updatePrj)
routes.get('/project/data', prj.findPrjById)
routes.del('/project/data', prj.deletePrj)

// api
// routes.get('/api/index', api.index)
routes.get('/api/getApiList.json', api.getApiList)
routes.get('/api/getApiDetail.json', api.getApiDetail)

// prd
routes.get('/prd/getPrdList.json', prd.getPrdList)
routes.post('/prd/data', prd.addPrd)
routes.put('/prd/data', prd.updatePrd)
routes.delete('/prd/data', prd.deletePrd)

module.exports = routes