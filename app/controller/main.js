'use strict';

export default {
  /**
   * 登陆
   * @return
   */
  index: async function (ctx, next) {
      await ctx.render('index', {
        title: 'feRap1'
      })
  }
}
