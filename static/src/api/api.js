export default {
  getUrl (key) {
    return window.pageConfig.siteUrl + 'api/' + {
      getApiList: 'getApiList.json',
      apiData: 'data'
    }[key]
  },

  /**
   * 获得列表数据
   */
  getApiList (prdId, cb) {
    axios.get(this.getUrl('getApiList') + `?prdId=${prdId}`, {prdId: prdId})
    .then(function (response) {
      cb(response.data)
    })
    .catch(function (response) {
      console.log(`faild: ${response}`)
    })
  }

}
