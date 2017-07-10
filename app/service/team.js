'use strict';

import db from '../common/db'
import sutil from '../common/sutil'
import utils from '../../global/utils'
import _ from 'underscore'

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

    user = await this.findUser(user)
    console.log(user)
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
    user = await this.findUser(user)

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
    user = await this.findUser(user)

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

  /**
   * 删除team
   * @param  {[type]}  user   [description]
   * @param  {[type]}  teamId [description]
   * @return {Promise}        [description]
   */
  deleteTeam: async function (user, teamId) {
    // 删除team
    const team = await teamDao.remove({ id: teamId })

    // 更新用户teams信息
    user = await this.findUser(user)
    let teams = user.teams || []
    teams = _.filter(teams, item => item.id !== teamId)
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
   * 根据ID查找team
   * @param  {[type]}  id [description]
   * @return {Promise}    [description]
   */
  findTeamById: async function (id) {
    const team = await teamDao.findOne({id: id})
    return team
  },

  /**
   * 查找所有团队，包括已加入的和未加入的
   * @param  {[type]}  user [description]
   * @return {Promise}      [description]
   */
  getAllTeamList: async function (user) {
    user = await this.findUser(user)

    const teams = user.teams || []
    let teamsMap = {}
    _.map(teams, (team) => {
      teamsMap[team.id] = team
    })

    // 查找所有团队
    const allteams = await teamDao.find()
    _.each(allteams, (team) => {
      if (_.has(teamsMap, team.id)) {
        team.joined = true  // 用户已加入团队
      }
      return team
    })

    // 排序
    allteams.sort((t1, t2) => {
      return t1.joined ? -1 : 1
    })

    return allteams
  },

  /**
   * 加入团队
   * @return {Promise} [description]
   */
  joinIntoTeam: async function (user, teamId) {
    user = await this.findUser(user)

    let teams = user.teams || []

    const team = await this.findTeamById(teamId)

    if (!team) return false

    teams.push({
      id: team.id,
      role: 'member',
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
   * 退出团队
   * @return {Promise} [description]
   */
  quitFromTeam: async function (user, teamId) {
    user = await this.findUser(user)

    let teams = user.teams || []

    const team = await this.findTeamById(teamId)

    if (!team) return false

    teams = _.filter(teams, item => item.id !== teamId)
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
   * 查找用户信息
   * @param  {[type]}  id [description]
   * @return {Promise}    [description]
   */
  findUser: async function (user) {
    return await userDao.findOne({username: user.username})
  }
}
