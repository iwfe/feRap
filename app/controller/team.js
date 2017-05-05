'use strict';

import sutil from '../common/sutil'
import userService from '../service/user'
import teamService from '../service/team'

export default {
  root: 'team',
  /**
   * 团队树
   * @return
   */
  getTeamsTree: async function (ctx, next) {
    const user = await userService.getLoginUser(ctx)
    const trees = await teamService.getTeamsTree(user)
    sutil.success(ctx, trees)
  },
  /**
   * 团队集合
   * @param  {[type]}   ctx  [description]
   * @param  {Function} next [description]
   * @return {Promise}       [description]
   */
  getTeamList: async function (ctx, next) {
    const user = await userService.getLoginUser(ctx)
    const teams = await teamService.getTeamList(user)
    sutil.success(ctx, teams)
  },

  /**
   * 更新团队
   * @param  {[type]}   ctx  [description]
   * @param  {Function} next [description]
   * @return {Promise}       [description]
   */
  addTeam: async function (ctx, next) {
    const {name, description} = ctx.parse
    const team = {
     name: name,
     description: description
    }
    const user = await userService.getLoginUser(ctx)
    const result = await teamService.addTeam(user, team)

    sutil.success(ctx, result)
  },
  /**
   * 更新团队
   * @param  {[type]}   ctx  [description]
   * @param  {Function} next [description]
   * @return {Promise}       [description]
   */
  updateTeam: async function (ctx, next) {
    const result = await teamService.updateTeam(ctx.parse)
    sutil.success(ctx, result)
  },
  /**
   * 删除团队
   * @param  {[type]}   ctx  [description]
   * @param  {Function} next [description]
   * @return {Promise}       [description]
   */
  deleteTeam: async function (ctx, next) {
    const user = await userService.getLoginUser(ctx)
    const result = await teamService.deleteTeam(user, ctx.parse.teamId)
    sutil.success(ctx, result)
  },
  /**
   * 根据Id查找team
   * @param  {[type]}   ctx  [description]
   * @param  {Function} next [description]
   * @return {Promise}       [description]
   */
  findTeamById: async function (ctx, next) {
    const result = await teamService.findTeamById(ctx.parse.teamId)
    sutil.success(ctx, result)
  }

}
