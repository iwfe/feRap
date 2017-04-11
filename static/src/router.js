import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/main/router'
import Teams from '@/teams/router'
import User from '@/user/router'
import Api from '@/api/router'

Vue.use(Router)

export default new Router({
  // base: '/',
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: require('@/login/Login')
    },
    Index,
    Teams,
    User,
    Api
  ]
})
