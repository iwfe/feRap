import apiApi from '@/api/api'
import * as types from '@/store/mutation-types'

// initial state
const state = {
  all: [],    // 所有数据
  curId: ''  // 当前apiId
}

// getters
const getters = {
  allApis: state => state.all,
  curId: state => state.curId
}

// actions
const actions = {
  getAllApis ({ commit }, prdId) {
    apiApi.getApiList(prdId, apis => {
      console.log(`actions ...${apis}`)
      commit(types.GET_ALL_APIS, { apis })
    })
  },
  setCurId ({ commit }, apiId) {
    console.log(`actions curId=${apiId}`)
    commit(types.SET_CUR_API_ID, { apiId })
  }
}

// mutations
const mutations = {
  [types.GET_ALL_APIS] (state, { apis }) {
    state.all = apis
  },
  [types.SET_CUR_API_ID] (state, { apiId }) {
    console.log(`mutation curId=${apiId}`)
    state.curId = apiId
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
