/*
 * @Author: zhuxinyong
 * @Date:   05/07/2017
 * @Email:  zhuxinyong.sh@superjia.com
 * @Last Modified by:   zhuxinyong
 * @Last Modified time: 05/07/2017
 */
import * as types from '@/store/mutation-types.js'

export default {
  state: {
    isLogin: sessionStorage.getItem('isLogin') || false,
    userName: sessionStorage.getItem('userName') || ''
  },
  getters: {
    getLoginStatus: (state) => {
      return state.isLogin
    },
    getLoginUserName: (state) => {
      return state.userName
    }
  },
  mutations: {
    [types.IS_LOGIN] (state, {isLogin}) {
      if (isLogin) {
        sessionStorage.setItem('isLogin', isLogin)
      } else {
        sessionStorage.removeItem('isLogin')
      }
      state.isLogin = isLogin
    },
    [types.USER_NAME] (state, {userName}) {
      if (userName) {
        sessionStorage.setItem('userName', userName)
      } else {
        sessionStorage.removeItem('userName')
      }
      state.userName = userName
    }
  },
  actions: {
    setLoginStatus (context, isLogin) {
      context.commit(types.IS_LOGIN, {isLogin})
    },
    setLoginUserName (context, userName) {
      context.commit(types.USER_NAME, {userName})
    }
  }
}
