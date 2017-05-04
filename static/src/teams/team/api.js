import Vue from 'vue'
import axios from 'axios'

export default {
  getUrl (key) {
    const rootPath = window.pageConfig.siteUrl + 'team/'
    console.log(`rootPath: ${rootPath}`)
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
