import teamsApi from '@/teams/api'
import * as types from '@/store/mutation-types'
import { store } from '../../common/util'

const starItemsKey = 'teamStarItems'
// initial state
const state = {
  all: [],    // 所有数据
  curNode: {},  // 当前树节点
  starItems: store.getItem(starItemsKey) || [], // 星标项目
  expendedNodes: [], // 打开的节点
  expendedCollections: []
}

// getters
const getters = {
  allTeams: state => state.all,
  curNode: state => state.curNode,
  starItems: state => state.starItems,
  expendedNodes: state => state.expendedNodes,
  expendedCollections: state => state.expendedCollections
}

// actions
const actions = {
  getAllTeams ({ commit }) {
    teamsApi.getTeamsTree(teams => {
      commit(types.GET_ALL_TEAMS, { teams })
      commit(types.SET_CUR_NODE, { node: teams[0] })
    })
  },
  setCurNode ({ commit }, node) {
    commit(types.SET_CUR_NODE, { node })
  },
  starItem ({ commit }, nodeId) {
    commit(types.STAR_TEAM_ITEM, { nodeId })
  },
  unStarItem ({ commit }, nodeId) {
    commit(types.UNSTAR_TEAM_ITEM, { nodeId })
  },
  toggleExpends ({ commit }, { setName, nodeId }) {
    commit(types.TOGGLE_EXPENDS, { setName, nodeId })
  }
}

// mutations
const mutations = {
  [types.GET_ALL_TEAMS] (state, { teams }) {
    state.all = teams
  },
  [types.SET_CUR_NODE] (state, { node }) {
    state.curNode = node
  },
  [types.STAR_TEAM_ITEM] (state, { nodeId }) {
    if (state.starItems.indexOf(nodeId) === -1) {
      state.starItems.push(nodeId)
      store.setItem(starItemsKey, state.starItems)
    }
  },
  [types.UNSTAR_TEAM_ITEM] (state, { nodeId }) {
    const idx = state.starItems.indexOf(nodeId)
    if (idx !== -1) {
      state.starItems.splice(idx, 1)
      store.setItem(starItemsKey, state.starItems)
    }
  },
  [types.TOGGLE_EXPENDS] (state, { nodeId, setName }) {
    const set = state[setName]
    const idx = set.indexOf(nodeId)
    idx === -1 ? set.push(nodeId) : set.splice(idx, 1)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
