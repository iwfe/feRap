'use strict';

import userService from '../service/user'

export default {
  /**
   * 登陆页面
   * @return
   */
  login: async (ctx, next) => {
      await ctx.render('index')
  },
  /**
   * 登陆
   * @return
   */
  toLogin: async (ctx, next) => {
    console.log('====', ctx.request.body)
    const { username, password } = ctx.request.body
    const isUser = await userService.toLogin(username, password)
    console.log('----', isUser);

    if (isUser) {
      await ctx.redirect('/index')
    } else {
      await ctx.redirect('/login')
    }
  },

  /**
   * 注册用户
   * @return
   */
  regist: async (ctx, next) => {
    const { username, password } = ctx.request.body
    const isUser = await userService.toLogin(username, password)
    await ctx.redirect('/login')
  }
}
