import Vue from 'vue'
import axios from 'axios'

export default {
  getUrl (key) {
    const rootPath = window.pageConfig.siteUrl + 'team/'
    return rootPath + {
      getTeamList: 'getTeamList.json'
    }[key]
  },
  getTeamList (cb) {
    axios.get(this.getUrl('getTeamList'), {})
    .then(function (response) {
      cb(response.data.data)
    })
    .catch(function (response) {
      console.log(`faild: ${response}`)
    })
  }
}
