'use strict';

import sutil from '../common/sutil'
import userService from '../service/user'
import teamService from '../service/team'

export default {
  root: 'team',
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
   * 团队树
   * @return
   */
  getTeamsTree: async function (ctx, next) {
    const user = ctx.locals._user
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
    const user = ctx.locals._user
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
    const user = ctx.locals._user
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
    const user = ctx.locals._user
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
  },

  /**
   * 查找所有团队，包括已加入的和未加入的
   * @param  {[type]}   ctx  [description]
   * @param  {Function} next [description]
   * @return {Promise}       [description]
   */
  getAllTeamList: async function (ctx, next) {
    const user = ctx.locals._user
    const result = await teamService.getAllTeamList(user)
    sutil.success(ctx, result)
  },
  /**
   * 加入团队
   * @return {Promise} [description]
   */
  joinIntoTeam: async function (ctx, next) {
    const user = ctx.locals._user
    const { teamId } = ctx.parse
    const result = await teamService.joinIntoTeam(user, teamId)
    sutil.success(ctx, result)
  },
  /**
   * 退出团队
   * @return {Promise} [description]
   */
  quitFromTeam: async function (ctx, next) {
    const user = ctx.locals._user
    const { teamId } = ctx.parse
    const result = await teamService.quitFromTeam(user, teamId)
    sutil.success(ctx, result)
  }

}
