const prefix = window.pageConfig.siteUrl + 'prd/'

function getUrl (key) {
  return prefix + {
    getPrdList: 'getPrdList.json',
    addPrd: 'data',
    updatePrd: 'data'
  }[key]
}

export default {
  getPrdList ({ projectId }) {
    return new Promise((resolve, reject) => {
      axios.get(getUrl('getPrdList'), {
        params: {
          projectId
        }
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  addPrd (params) {
    return new Promise((resolve, reject) => {
      axios.post(getUrl('addPrd'), params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  updatePrd (params) {
    return new Promise((resolve, reject) => {
      axios.put(getUrl('addPrd'), params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  deletePrd (params) {
    return new Promise((resolve, reject) => {
      axios.delete(getUrl('addPrd'), {
        data: params
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
    })
  }
}
