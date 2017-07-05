'use strict'

import sutil from '../common/sutil'
import prdService from '../service/prd'

export default {
  root: 'team',
  getPrdList: async function (ctx, next) {
    const user = ctx.locals._user
    const { projectId } = ctx.locals.parse
    const prds = await prdService.getPrdList(user, projectId)
    sutil.success(ctx, prds)
  },
  addPrd: async function (ctx, next) {
    const user = ctx.locals._user
    const data = ctx.locals.parse
    const prd = await prdService.addPrd(user, data)
    sutil.success(ctx, prd)
  },
  updatePrd: async function (ctx, next) {
    const user = ctx.locals._user
    const data = ctx.locals.parse
    const prds = await prdService.updatePrd(user, data)
    sutil.success(ctx, prds)
  },
  deletePrd: async function (ctx, next) {
    const user = ctx.locals._user
    const {
      projectId,
      id
    } = ctx.locals.parse
    const removed = await prdService.deletePrd(user, projectId, id)
    sutil.success(ctx, removed)
  }
}
