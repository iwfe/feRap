export default {
  getUrl (key) {
    return window.pageConfig.siteUrl + 'calendar/' + {
      getCalendar: 'getCalendar.json'
    }[key]
  },
  getCalendarList (cb) {
    axios.get(this.getUrl('getCalendar'), {})
    .then(function (response) {
      cb(response.data)
    })
    .catch(function (response) {
      console.log(`faild: ${response}`)
    })
  }
}
