import team from '../../teams/api'
import * as types from '../mutation-types'

// initial state
const state = {
  all: []
}

// getters
const getters = {
  allTeams: state => state.all
}

// actions
const actions = {
  getAllTeams ({ commit }) {
    alert(`action...getAllTeams`)
    team.getTeams(teams => {
      commit(types.GET_ALL_TEAMS, { teams })
    })
  }
}

// mutations
const mutations = {
  [types.GET_ALL_TEAMS] (state, { teams }) {
    state.all = teams
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
