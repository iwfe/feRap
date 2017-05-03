'use strict';

import db from '../common/db'
import sutil from '../common/sutil'

const teamDao = db.get('team')
const projectDao = db.get('project')
const prdDao = db.get('prd')

export default {

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
      console.log(`team.name:${team.name}`);
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

  createTreeNode (id, type, label, children) {
    return {
      id,
      type,
      label,
      children
    }
  }
}
