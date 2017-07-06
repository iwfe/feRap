// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router.js'
import store from './store'

import '@/styles/global.css'
import '@/styles/site.css'

import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false

window.pageConfig = { // 用于测试
  siteUrl: 'http://localhost:8080/'
}

import '@/common/axios-init'

// 路由拦截
router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.requireLogin) { // 该路由是否需要登录权限
    if (!store.getters['login/getLoginStatus']) {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

axios.interceptors.request.use(
  config => {
    if (store.getters['login/getLoginStatus']) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `token ${store.getters['login/getLoginStatus']}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    switch (response.data.code) {
      case 10001:
        // 返回 401 清除token信息并跳转到登录页面
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
    console.log(error)
    if (error.response) {
      switch (error.response.status) {
        case 10001:
          // 返回 401 清除token信息并跳转到登录页面
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
