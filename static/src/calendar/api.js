export default {
  getUrl (key) {
    return window.pageConfig.siteUrl + 'calendar/' + {
      getcalendarList: 'getcalendarList.json'
    }[key]
  },
  getcalendarList (cb) {
    axios.get(this.getUrl('getcalendarList'), {})
    .then(function (response) {
      cb(response.data)
    })
    .catch(function (response) {
      console.log(`faild: ${response}`)
    })
  }
}
