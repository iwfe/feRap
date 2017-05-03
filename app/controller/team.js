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
    console.log(`controller..... getTeamsTree...`);
    const user = await userService.getLoginUser(ctx)
    console.log(JSON.stringify(user));
    const trees = await teamService.getTeamsTree(user)
    console.log(`trees===${trees}`);
    sutil.success(ctx, trees)
  }
}
