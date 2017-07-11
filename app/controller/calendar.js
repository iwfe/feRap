'use strict';

import sutil from '../common/sutil'
import userService from '../service/user'
import teamService from '../service/team'
import prdService from '../service/prd'
import calendar from '../service/calendar'

export default {
    root: 'calendar',
    /**
    * 日历
    * @param  {[type]}   ctx  [description]
    * @param  {Function} next [description]
    * @return {Promise}       [description]
    */
    getcalendarList: async function (ctx, next) {
        const user = ctx.locals._user
        const List = await teamService.getTeamList(user)
        const teamIds = List.map((val)=>{
            return val.id
        })
        const prds = await calendar.getPrd(teamIds)
        const prjs = await calendar.getprjs(teamIds)
        const prjMap = {}
        prjs.forEach((item)=>{
            prjMap[item.id] = item.name
        })
        prds.forEach((item)=>{
            const prjName = prjMap[item.projectId]
            item.projectName = prjName || ''
        })
        sutil.success(ctx, prds)
    }
}

