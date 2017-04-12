'use strict';

import userService from '../service/user.js'

export default {
  /**
   * 登陆页面
   * @return
   */
  login: async function (ctx, next) {
      await ctx.render('index')
  },
  /**
   * 登陆
   * @return
   */
  toLogin: async function (ctx, next) {
    console.log('====', ctx.request.body)
    const { username, pwd } = ctx.request.body
    const isUser = await userService.toLogin(username, pwd)
    console.log('----', isUser);
    if (isUser) {
      await ctx.redirect('/index')
    } else {
      console.log('11111');
      await ctx.redirect('/login')
    }
  },

  /**
   * 注册用户
   * @return
   */
  regist: async function (ctx, next) {
      await ctx.render('index')
  }
}
