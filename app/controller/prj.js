import sutil from '../common/sutil'
import prjService from '../service/prj'
export default {
    root: 'project',
    /**
     * 项目集合
     * @param  {[type]}   ctx  [description]
     * @param  {Function} next [description]
     * @return {Promise}       [description]
     */
    getPrjList: async function (ctx, next) {
        const {teamId} = ctx.locals.parse
        const prjs = await prjService.getPrjList(teamId)
        sutil.success(ctx, prjs)
    },
    /**
     * 新增项目
     * @param  {[type]}   ctx  [description]
     * @param  {Function} next [description]
     * @return {Promise}       [description]
     */
    addPrj: async function (ctx, next) {
        const {name, description, teamId} = ctx.locals.parse
        const prj = {
        name: name,
        description: description,
        teamId: teamId
        }
        const user = ctx.locals._user
        const result = await prjService.addPrj(user, prj)

        sutil.success(ctx, result)
    },       
    /**
     * 更新项目
     * @param  {[type]}   ctx  [description]
     * @param  {Function} next [description]
     * @return {Promise}       [description]
     */
    updatePrj: async function (ctx, next) {
        const result = await prjService.updatePrj(ctx.locals.parse)
        sutil.success(ctx, result)
    },
    /**
     * 删除项目
     * @param  {[type]}   ctx  [description]
     * @param  {Function} next [description]
     * @return {Promise}       [description]
     */
    deletePrj: async function (ctx, next) {
        const result = await prjService.deletePrj(ctx.locals.parse.prjId)
        sutil.success(ctx, result)
    },
    /**
     * 根据Id查找prj
     * @param  {[type]}   ctx  [description]
     * @param  {Function} next [description]
     * @return {Promise}       [description]
     */
    findPrjById: async function (ctx, next) {
        const result = await prjService.findPrjById(ctx.locals.parse.id)
        sutil.success(ctx, result)
    },             
}