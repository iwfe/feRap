
export default {
  getUrl (key) {
    return window.pageConfig.siteUrl + 'team/' + {
      getAllTeamList: 'getAllTeamList.json',
      joinIntoTeam: 'joinIntoTeam.json',
      quitFromTeam: 'quitFromTeam.json',
      teamData: 'data'
    }[key]
  },
  /**
   * 获得列表数据
   */
  getAllTeamList () {
    return axios.get(this.getUrl('getAllTeamList'))
    .then(res => {
      return res.data
    })
  },
  /**
   * 加入团队
   */
  joinIntoTeam (teamId) {
    return axios.get(this.getUrl('joinIntoTeam') + `?teamId=${teamId}`)
    .then(res => {
      return res.data
    })
  },
  /**
   * 退出团队
   */
  quitFromTeam (teamId) {
    return axios.get(this.getUrl('quitFromTeam') + `?teamId=${teamId}`)
    .then(res => {
      return res.data
    })
  },
  /**
   * 新增团队
   */
  addTeam (data) {
    return axios.post(this.getUrl('teamData'), data)
  },
  /**
   * 修改团队
   */
  updateTeam (data) {
    return axios.put(this.getUrl('teamData'), data)
  },
  /**
   * 删除团队
   */
  delTeam (id) {
    return axios.delete(this.getUrl('teamData') + `?teamId=${id}`)
  }
}
