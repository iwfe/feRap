import db from '../common/db'

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
  findUser: async function (user) {
    return await userDao.findOne({'_id': user._id})
  },
  findProject: async function (projectId) {
    return await projectDao.findOne({ id: projectId })
  }
}
