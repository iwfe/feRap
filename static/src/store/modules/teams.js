import teamsApi from '@/teams/api'
import * as types from '@/store/mutation-types'
import { store } from '../../common/util'

function addParent (node) {
  if (!node.children || node.children.length === 0) return node
  node.children.map(d => (d.parent = node) && addParent(d))
  return node
}

function findByIdList (data, ids) {
  const [curId, ...oth] = ids
  if (!curId) return data

  const cur = data.children.find(d => d.id === curId)
  return cur ? findByIdList(cur, oth) : null
}

const starItemsKey = 'teamStarItems'
// initial state
const state = {
  all: [],    // 所有数据
  curNode: {},  // 当前树节点
  teamPrjPrdId: {},
  starItems: store.getItem(starItemsKey) || [], // 星标项目
  expendedNodes: [], // 打开的节点
  expendedCollections: []
}

// getters
const getters = {
  allTeams: state => state.all,
  curNode: state => state.curNode,
  teamPrjPrdId: state => state.teamPrjPrdId,
  starItems: state => state.starItems,
  expendedNodes: state => state.expendedNodes,
  expendedCollections: state => state.expendedCollections
}

// actions
const actions = {
  getAllTeams ({ commit }) {
    return teamsApi.getTeamsTree()
      .then(({data: res}) => {
        const teams = res.map(addParent)
        commit(types.GET_ALL_TEAMS, { teams })
      })
  },
  setCurNode ({ commit, state }, params) {
    // debugger
    const all = state.all[0]
    const { teamId, projectId, prdId } = params
    const idList = [teamId, projectId, prdId]
    const node = findByIdList(all, idList)
    commit(types.SET_CUR_NODE, { node })
    commit(types.SET_TEAM_PRJ_PRD_ID, params)
  },
  starItem ({ commit }, nodeId) {
    commit(types.STAR_TEAM_ITEM, { nodeId })
  },
  unStarItem ({ commit }, nodeId) {
    commit(types.UNSTAR_TEAM_ITEM, { nodeId })
  },
  toggleExpends ({ commit }, { setName, nodeId }) {
    commit(types.TOGGLE_EXPENDS, { setName, nodeId })
  },
  addExpends ({ commit }, {setName, nodeIds}) {
    commit(types.ADD_EXPENDS, {setName, nodeIds})
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
  [types.SET_TEAM_PRJ_PRD_ID] (state, { teamId, projectId, prdId }) {
    state.teamPrjPrdId = {
      teamId,
      projectId,
      prdId
    }
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
  },
  [types.ADD_EXPENDS] (state, {nodeIds, setName}) {
    const set = new Set([...state[setName], ...nodeIds])
    state[setName] = Array.from(set)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
