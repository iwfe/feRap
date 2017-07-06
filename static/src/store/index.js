import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import teams from './modules/teams'
import apis from './modules/apis'
import logins from './modules/logins'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    teams: {
      namespaced: true,
      ...teams
    },
    apis: {
      namespaced: true,
      ...apis
    },
    login: {
      namespaced: true,
      ...logins
    }
  },
  strict: debug
})
