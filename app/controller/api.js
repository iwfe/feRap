'use strict';

import sutil from '../common/sutil'
import userService from '../service/user'
import apiService from '../service/api'

export default {
  root: 'api',
  /**
   * 主页
   * @param  {[type]}   ctx  [description]
   * @param  {Function} next [description]
   * @return {Promise}       [description]
   */
  index: async (ctx, next) => {
    await ctx.render('index')
  },
  /**
   * 获得列表
   * @param  {[type]}   ctx  [description]
   * @param  {Function} next [description]
   * @return {Promise}       [description]
   */
  getApiList: async function (ctx, next) {
    // const { prdId } = ctx.locals.parse
    const prdId = 'm3tnaO'
    const apis = await apiService.getApiList(prdId)
    sutil.success(ctx, apis)
  },
  /**
   * [getApiDetail description]
   * @param  {[type]}   ctx  [description]
   * @param  {Function} next [description]
   * @return {Promise}       [description]
   */
  getApiDetail: async function (ctx, next) {
    const { apiId } = ctx.locals.parse

    const api = await apiService.getApiDetail(apiId)
    sutil.success(ctx, api)
  }
}
