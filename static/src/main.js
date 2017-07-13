import Vue from 'vue'
import App from './App'
import router from './router.js'
import store from './store'

import '@/styles/global.css'
import '@/styles/site.css'

import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false

window.pageConfig = {
  siteUrl: 'http://localhost:8081/'
}

import '@/common/axios-init'

// 路由拦截
router.beforeEach((to, from, next) => {
  console.log('beforeEach')
  if (to.meta && to.meta.requireLogin) { // 该路由是否需要登录权限
    console.log('====', store.getters['login/getLoginStatus'])
    if (store.getters['login/getLoginStatus']) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

axios.interceptors.request.use(
  config => {
    if (store.getters['login/getLoginStatus']) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.token = store.getters['login/getLoginStatus']
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

axios.interceptors.response.use(
  response => {
    switch (response.data.code) {
      case 10001:
        store.dispatch('login/setLoginStatus', false)
        store.dispatch('login/setLoginUserName', '')

        router.replace({
          path: '/login',
          query: {redirect: router.currentRoute.fullPath}
        })
    }
    return response.data
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 10001:
          store.dispatch('login/setLoginStatus', false)
          store.dispatch('login/setLoginUserName', '')

          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    return Promise.reject(error)   // 返回接口返回的错误信息
  })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
