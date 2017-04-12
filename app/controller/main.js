'use strict';

export default {
  /**
   * 首页
   * @return
   */
  index: async function (ctx, next) {
      await ctx.render('index', {
        title: 'feRap'
      })
  }
}
