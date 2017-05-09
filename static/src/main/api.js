
export default {
  getUrl (key) {
    return window.pageConfig.siteUrl + 'team/' + {
      getAllTeamList: 'getAllTeamList.json',
      joinIntoTeam: 'joinIntoTeam.json',
      quitFromTeam: 'quitFromTeam.json'
    }[key]
  },
  /**
   * 获得列表数据
   */
  getAllTeamList (cb) {
    axios.get(this.getUrl('getAllTeamList'), {})
    .then(function (response) {
      cb(response.data)
    })
  },
  /**
   * 加入团队
   */
  joinIntoTeam (teamId, cb) {
    axios.get(this.getUrl('joinIntoTeam') + `?teamId=${teamId}`)
    .then(function (response) {
      cb(response.data)
    })
  },
  /**
   * 退出团队
   */
  quitFromTeam (teamId, cb) {
    axios.get(this.getUrl('quitFromTeam') + `?teamId=${teamId}`)
    .then(function (response) {
      cb(response.data)
    })
  }
}
