// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router.js'
import store from './store'
import axios from 'axios'

import '@/styles/global.css'
import '@/styles/site.css'

import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios  // 将axios对象clone到Vue的$http属性

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
