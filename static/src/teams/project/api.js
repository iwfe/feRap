export default {
  getUrl (key) {
    return window.pageConfig.siteUrl + 'project/' + {
      getPrjList: 'getPrjList.json',
      prjData: 'data'
    }[key]
  },

  /**
   * 获得列表数据
   */
  getPrjList (id, cb) {
    axios.get(this.getUrl('getPrjList') + `?teamId=${id}`)
    .then(function (response) {
      cb(response.data)
    })
    .catch(function (response) {
      console.log(`faild: ${response}`)
    })
  },

  /**
   * 新增或修改
   */
  addOrUpdatePrj (data, cb) {
    const method = data.id ? 'put' : 'post'
    axios[method](this.getUrl('prjData'), data)
    .then(function (response) {
      cb(response.data)
    })
    .catch(function (response) {
      console.log(`faild: ${response}`)
    })
  },
  /**
   * 删除团队
   */
  delPrj (id, cb) {
    axios.delete(this.getUrl('prjData') + `?prjId=${id}`)
    .then(function (response) {
      cb(response.data)
    })
    .catch(function (response) {
      console.log(`faild: ${response}`)
    })
  },
  /**
   * 根据ID查找项目
   */
  findPrjById (id, cb) {
    axios.get(this.getUrl('prjData') + `?prjId=${id}`)
    .then(function (response) {
      cb(response.data)
    })
    .catch(function (response) {
      console.log(`faild: ${response}`)
    })
  }
}
