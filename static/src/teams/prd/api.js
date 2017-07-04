const prefix = window.pageConfig.siteUrl + 'prd/'

function getUrl (key) {
  return prefix + {
    getPrdList: 'getPrdList.json'
  }[key]
}

export default {
  getPrdList (projectId) {
    return new Promise((resolve, reject) => {
      axios.get(getUrl('getPrdList'), {
        params: {
          projectId: '9RWVql'
        }
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
