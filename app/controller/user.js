'use strict';

import userService from '../service/user'
import sutil from '../common/sutil'

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
    console.log(ctx.url);
    console.log(`ctx.request.query=${JSON.stringify(ctx.request)}`);
    const { username, password } = ctx.request.body
    const user = await userService.toLogin(username, password)

    if (!user) {
      console.log('用户名或密码不正确');
      await ctx.redirect('/login')
      // await sutil.render(ctx, {
      //   username: username,
      //   error: '用户名或密码不正确'
      // });
    } else {
      ctx.locals = ctx.locals || {}
      ctx.locals._user = user
      const refer = (ctx.parse ? ctx.parse.next : null) || '/index'
      console.log(`refer======${refer}`);
      ctx.redirect(refer);
    }
  },

  /**
   * 注册用户页面
   * @return
   */
  regist: async (ctx, next) => {
    await ctx.render('index')
  },
  /**
   * 注册用户
   * @param  {[type]}   ctx  [description]
   * @param  {Function} next [description]
   * @return {Promise}       [description]
   */
  toRegist: async (ctx, next) => {
    const { username, password } = ctx.request.body

    // 判断用户是否存在
    const user = await userService.findByUserName(username)
    console.log(user);
    if (user) {
      console.log('用户名已经存在')
      await sutil.render('index', {
        error: '用户名已经存在'
      });
      return false;
    }

    // 保存用户
    const isUser = await userService.regist(username, password)

    // 跳转
    await ctx.redirect('/login')
  },

  /**
   * 根据用户名查找用户
   * @param  {[type]}   ctx  [description]
   * @param  {Function} next [description]
   * @return {Promise}       [description]
   */
  getUserByUserName: async (ctx, next) => {
    const { username } = ctx.request.body
    const user = await userService.findByUserName(username)
    if (user) {
      return true
    } else {
      return false
    }
  }
}
