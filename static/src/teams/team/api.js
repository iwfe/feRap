export default {
  getUrl (key) {
    const rootPath = window.pageConfig.siteUrl + 'team/'
    return rootPath + {
      getTeamList: 'getTeamList.json',
      teamData: 'data'
    }[key]
  },

  /**
   * 获得列表数据
   */
  getTeamList (cb) {
    axios.get(this.getUrl('getTeamList'), {})
    .then(function (response) {
      cb(response.data.data)
    })
    .catch(function (response) {
      console.log(`faild: ${response}`)
    })
  },

  /**
   * 新增或修改
   */
  addOrUpdateTeam (data, cb) {
    const method = data.id ? 'put' : 'post'
    axios[method](this.getUrl('teamData'), data)
    .then(function (response) {
      cb(response.data.data)
    })
    .catch(function (response) {
      console.log(`faild: ${response}`)
    })
  },
  /**
   * 删除团队
   */
  delTeam (id, cb) {
    axios.delete(this.getUrl('teamData') + `?teamId=${id}`)
    .then(function (response) {
      cb(response.data.data)
    })
    .catch(function (response) {
      console.log(`faild: ${response}`)
    })
  },
  /**
   * 根据ID查找团队
   */
  findTeamById (id, cb) {
    axios.get(this.getUrl('teamData') + `?teamId=${id}`)
    .then(function (response) {
      cb(response.data.data)
    })
    .catch(function (response) {
      console.log(`faild: ${response}`)
    })
  }

}
