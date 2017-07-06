// axios.defaults.baseURL = window.pageConfig.siteUrl
import store from '../store'
// 添加一个请求拦截器
// axios.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   return config
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error)
// })

// 添加一个响应拦截器
// axios.interceptors.response.use(function (response) {
//   // Do something with response data
//   return response.data
// }, function (error) {
//   // Do something with response error
//   console.log(`faild: ${error}`)
//   return Promise.reject(error)
// })

// http request 拦截器
// axios.interceptors.request.use(
//   config => {
//     if (store.getters['login/getLoginStatus']) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
//       config.headers.Authorization = `token ${store.getters['login/getLoginStatus']}`
//     }
//     return config
//   },
//   err => {
//     return Promise.reject(err)
//   })
//
// // http response 拦截器
// axios.interceptors.response.use(
//   response => {
//     return response.data
//   },
//   error => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 10001:
//           // 返回 401 清除token信息并跳转到登录页面
//           store.dispatch('login/setLoginStatus', false)
//           store.dispatch('login/setLoginUserName', '')
//
//           router.replace({
//             path: 'login',
//             query: {redirect: router.currentRoute.fullPath}
//           })
//       }
//     }
//     return Promise.reject(error)   // 返回接口返回的错误信息
//   })
