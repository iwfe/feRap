'use strict';

import sutil from '../common/sutil'
import userService from '../service/user'
import teamService from '../service/team'

export default {
  root: 'team',
  /**
   * 首页
   * @return
   */
  getTeamsTree: async function (ctx, next) {
    const user = await userService.getLoginUser(ctx)
    const trees = await teamService.getTeamsTree(user)
    sutil.success(ctx, trees)
  },

  getTeamList: async function (ctx, next) {
    const user = await userService.getLoginUser(ctx)
    const teams = await teamService.getTeamList(user)
    sutil.success(ctx, teams)
  }
}
