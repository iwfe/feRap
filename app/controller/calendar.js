'use strict';

import sutil from '../common/sutil'
import userService from '../service/user'
import teamService from '../service/team'
import calendar from '../service/calendar'

export default {
    root: 'calendar',
    /**
    * 日历
    * @param  {[type]}   ctx  [description]
    * @param  {Function} next [description]
    * @return {Promise}       [description]
    */
    getCalendarList: async function (ctx, next) {
        const user = ctx.locals._user
        const trees = await teamService.getTeamsTree(user)
        sutil.success(ctx, trees)
    }
}

