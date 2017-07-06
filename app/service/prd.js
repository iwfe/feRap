import db from '../common/db'
import utils from '../../global/utils'
import sutil from '../common/sutil'

const userDao = db.get('user')
const teamDao = db.get('team')
const projectDao = db.get('project')
const prdDao = db.get('prd')

export default {
  /**
   *
   * @desc 根据用户和项目id查询prd列表
   * @param {object} user
   * @param {string} projectId
   * @returns Array
   */
  getPrdList: async function (user, projectId) {
    let userInTeam = false

    user = await this.findUser(user)
    if (!projectId) return []

    const project = await this.findProject(projectId)
    if (!project.teamId) return []

    const userTeams = user.teams
    if (!userTeams || userTeams.length === 0) return []

    for (let i = 0; i < userTeams.length; i++) {
      if (userTeams[i].id === project.teamId) {
        userInTeam = true
      }
    }

    if (!userInTeam) return []
    let prds = await prdDao.find({projectId: projectId})
    for (let i = 0; i < prds.length; i++) {
      prds[i].projectName = project.name
    }
    return prds
  },
  // 增加prd
  addPrd: async function (user, prd) {
    const projectId = prd.projectId
    // 判断用户是否在该团队中
    let userInTeam = false

    user = await this.findUser(user)
    if (!projectId) return false

    const project = await this.findProject(projectId)
    if (!project.teamId) return false

    const userTeams = user.teams
    if (!userTeams || userTeams.length === 0) return false

    for (let i = 0; i < userTeams.length; i++) {
      if (userTeams[i].id === project.teamId) {
        userInTeam = true
      }
    }

    // 如果用户不在该项目中
    if (!userInTeam) return false

    const id = await sutil.genId(teamDao)

    let insertPrd = await prdDao.insert({
      'id': id,                                // prd ID
      'teamId': project.teamId,               // 团队id
      'projectId': prd.projectId,             // 项目id
      'createUser': user.username,            // 创建人名
      'createTime': Date.now(),               // 创建时间
      'updateTime': Date.now(),               // 更新时间
      'name': prd.name,                       // prd名称
      'description': prd.description,         // 主要功能
      'jira': prd.jira,                       // JIRA地址
      'testTime': prd.testTime,               // 提测时间
      'onlineTime': prd.onlineTime,           // 上线时间
      'mergeMaster': prd.mergeMaster || '否', // 是否合master
      'comment': prd.comment                  // 备注
    })
    return insertPrd
  },
  // 编辑prd
  updatePrd: async function (user, prd) {
    const projectId = prd.projectId
    // 判断用户是否在该团队中
    let userInTeam = false

    user = await this.findUser(user)
    if (!projectId) return false
    const project = await this.findProject(projectId)
    if (!project.teamId) return false

    const userTeams = user.teams
    if (!userTeams || userTeams.length === 0) return false
    for (let i = 0; i < userTeams.length; i++) {
      if (userTeams[i].id === project.teamId) {
        userInTeam = true
      }
    }

    // 如果用户不在该项目中
    if (!userInTeam) return false
    if (!prd.id) return false

    const allowKeys = [
      'name',
      'description',
      'jira',
      'testTime',
      'onlineTime',
      'mergeMaster',
      'comment'
    ]
    let obj = utils.getObjByKeys(allowKeys, prd)
    const insertPrd = await prdDao.update(
      {
        id: prd.id
      },
      {
        '$set': Object.assign({
          'updateTime': Date.now()
        }, obj)
      }
    )
    return insertPrd
  },
  // 删除prd
  deletePrd: async function (user, projectId, prdId) {
    // 判断用户是否在该团队中
    let userInTeam = false

    user = await this.findUser(user)
    if (!projectId) return false
    const project = await this.findProject(projectId)
    if (!project.teamId) return false

    const userTeams = user.teams
    if (!userTeams || userTeams.length === 0) return false
    for (let i = 0; i < userTeams.length; i++) {
      if (userTeams[i].id === project.teamId) {
        userInTeam = true
      }
    }
    // 如果用户不在该项目中
    if (!userInTeam) return false
    if (!prdId) return false
    const removedPrd = await prdDao.remove({
      id: prdId
    })
    return removedPrd
  },
  // 根据用户ID找到用户
  findUser: async function (user) {
    return await userDao.findOne({'_id': user._id})
  },
  // 根据项目id找到该项目
  findProject: async function (projectId) {
    return await projectDao.findOne({ id: projectId })
  }
}
