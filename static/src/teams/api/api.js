export default {
  getUrl (key) {
    return window.pageConfig.siteUrl + 'api/' + {
      getApiList: 'getApiList.json',
      getApiDetail: 'getApiDetail.json',
      apiData: 'data',
      saveApi: 'save'
    }[key]
  },

  /**
   * 获得列表数据
   */
  getApiList (prdId, cb) {
    axios.get(this.getUrl('getApiList') + `?prdId=${prdId}`)
    .then(function (response) {
      cb(response.data)
    })
    .catch(function (response) {
      console.log(`faild: ${response}`)
    })
  },
  /**
   * 获得列表数据
   */
  getApiDetail (apiId, cb) {
    axios.get(this.getUrl('getApiDetail') + `?apiId=${apiId}`)
    .then(function (response) {
      cb(response.data)
    })
    .catch(function (response) {
      console.log(`faild: ${response}`)
    })
  },
  /**
   * 保存Api
   */
  saveApi (apiData) {
    axios.post(this.getUrl('saveApi'))
    .then(function (response) {
      cb(response.data)
    })
    .catch(function (response) {
      console.log(`faild: ${response}`)
    })
  }

}
