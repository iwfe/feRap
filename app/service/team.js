'use strict';

import db from '../common/db'
import sutil from '../common/sutil'
import utils from '../../global/utils'

const userDao = db.get('user')
const teamDao = db.get('team')
const projectDao = db.get('project')
const prdDao = db.get('prd')

export default {
  /**
   * 查找团队树
   * @param  {[type]}  user [description]
   * @return {Promise}      [description]
   */
  getTeamsTree: async function (user) {
    let qteam = [], qprj = [],
        trees = [], treesMap = {}

    const teams0 = user.teams
    if(!teams0 || !teams0.length) return []

    const root = this.createTreeNode(0, 0, '全部', [])
    trees.push(root)
    treesMap['team_0'] = root

    // team
    for(let t in teams0) {
      const team = teams0[t]
      qteam.push(team.id)
    }

    const teams = await teamDao.find({id: {'$in': qteam}})
    if(!teams || !teams.length) return []

    for(let t in teams) {
      const team = teams[t]
      // 创建树节点
      const node = this.createTreeNode(team.id, 1, team.name, [])
      treesMap[`team_${team.id}`] = node
      treesMap['team_0'].children.push(node)
    }

    // 查找project
    const prjs = await projectDao.find({teamId: {'$in': qteam}})
    for(let t in prjs) {
      const prj = prjs[t]
      qprj.push(prj.id)
      // 创建树节点
      const node = this.createTreeNode(prj.id, 2, prj.name, [])
      treesMap[`prj_${prj.id}`] = node
      treesMap[`team_${prj.teamId}`].children.push(node)
    }

    // 查找prd
    const prds = await prdDao.find({projectId: {'$in': qprj}}, {sort: {createTime: -1}})
    for(let t in prds) {
      const prd = prds[t]
      // 创建树节点
      const node = this.createTreeNode(prd.id, 3, prd.name, [])
      treesMap[`prj_${prd.projectId}`].children.push(node)
    }

    // console.log(JSON.stringify(trees));
    return trees
  },
  /**
   * 创建树节点
   */
  createTreeNode: function (id, type, label, children) {
    return {
      id,
      type,
      label,
      children
    }
  },
  /**
   * 团队列表
   * @param  {[type]}  user [description]
   * @return {Promise}      [description]
   */
  getTeamList: async function (user) {
    const teams0 = user.teams
    if(!teams0 || !teams0.length) return []

    let qteam = []
    for(let t in teams0) {
      const team = teams0[t]
      qteam.push(team.id)
    }
    const teams = await teamDao.find({id: {'$in': qteam}})

    for (let t in teams) {
      const team = teams[t]
      // 格式化日期
      team.createTime = utils.formateDate(team.createTime, '%F')
      // 查找团队的用户
      const users = await userDao.find({'teams.id': team.id})
      let teamUsers = []
      for (let u in users) {
        teamUsers.push(users[u].username)
      }
      team.users = teamUsers
    }
    return teams
  },
  /**
   * 添加团队
   * @param  {[type]}  user [description]
   * @param  {[type]}  team [description]
   * @return {Promise}      [description]
   */
  addTeam: async function (user, team) {
    let teams = user.teams || []
    const id = await sutil.genId(teamDao)

    team = await teamDao.insert(Object.assign(team, {
      id: id,
      createUser: user.username,
      createTime: Date.now(),
      updateTime: Date.now()
    }))

    teams.push({
      id: team.id,
      role: 'owner',
      status: 'normal'
    })

    await userDao.update({
      _id: user._id
    }, {
      $set: {
        teams: teams
      }
    })

    return true
  },
  /**
   * 更新团队
   * @param  {[type]}  user [description]
   * @param  {[type]}  team [description]
   * @return {Promise}      [description]
   */
  updateTeam: async function (team) {
    team = await teamDao.update({
      id: team.id
    }, {
      $set: Object.assign({
          updateTime: Date.now()
        },
        team)
    });
    return true
  },

  findTeamById: async function (id) {
    const team = await teamDao.findOne({id: id})
    return team
  }
}
