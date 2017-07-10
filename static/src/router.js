import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/login/router'
import Index from '@/main/router'
import Teams from '@/teams/router'
// import User from '@/user/router'
import Api from '@/api/router'
import calendar from '@/calendar/router'

Vue.use(Router)

export default new Router({
  // base: '/',
  mode: 'history',
  routes: [
    ...Login,
    Index,
    Teams,
    // User,
    Api,
    calendar
  ]
})
