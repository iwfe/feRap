'use strict'

import sutil from '../common/sutil'
import prdService from '../service/prd'

export default {
  root: 'team',
  getPrdList: async function (ctx, next) {
    const user = ctx.locals._user
    const { projectId } = ctx.locals.parse
    // console.log('^^^^^^____^^^^^^^', ctx.locals.parse)
    const prds = await prdService.getPrdList(user, projectId)
    sutil.success(ctx, prds)
  }
}
