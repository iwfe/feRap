import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/index/router.js'
import Main from '@/main/router.js'
import Login from '@/login/router.js'
import Teams from '@/teams/router.js'
// import User from '@/user/router'
import Api from '@/api/router.js'

Vue.use(Router)

export default new Router({
  // base: '/',
  mode: 'history',
  routes: [
    Index,
    Main,
    Teams,
    ...Login,
    Api
    // User,
  ]
})
