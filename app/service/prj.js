import db from '../common/db'
import sutil from '../common/sutil'
import utils from '../../global/utils'
import _ from 'underscore'

const userDao = db.get('user')
const teamDao = db.get('team')
const projectDao = db.get('project')
const prdDao = db.get('prd')

export default {
    /**
     * 项目列表(查找)
     * @param  {[type]}  id [description]
     * @return {Promise}      [description]
     */
    getPrjList: async function (id) {
        let prjs = await this.findPrjsByTeamId(id)
        if(!prjs || !prjs.length) return []
        for(let p in prjs){
            const prj = prjs[p]
            //格式化日期
            prj.createTime = utils.formateDate(prj.createTime, '%F')
            prj.updateTime = utils.formateDate(prj.updateTime, '%F')
        }
        return prjs
    },
    /**
     * 添加项目
     * @param  {[type]}  user [description]
     * @param  {[type]}  teamId [description]
     * @param  {[type]}  prj Id[description]
     * @return {Promise}      [description]
     */
    addPrj: async function (user, prj) {
        user = await this.findUser(user)
        const prjId = await sutil.genId(projectDao)
        prj = await projectDao.insert(Object.assign(prj, {
        id: prjId,
        createUser: user.username,
        createTime: Date.now(),
        updateTime: Date.now()
        }))
        await projectDao.update(
            {id: prj.id}, 
            {$set: prj}
        )    
        return true
    },
    /**
     * 更新项目
     * @param  {[type]}  user [description]
     * @param  {[type]}  team [description]
     * @return {Promise}      [description]
     */
    updatePrj: async function (prj) {
        prj = await projectDao.update({
        id: prj.id
        }, {
        $set: Object.assign({
            updateTime: Date.now()
            },
        prj)
        });
        return true
    },
    /**
     * 删除prj
     * @param  {[type]}  user   [description]
     * @param  {[type]}  prjId [description]
     * @return {Promise}        [description]
     */
    deletePrj: async function (prjId) {
        // 删除prj
        const prj = await projectDao.remove({ id: prjId })
        return true
    },            
    /**
     * 根据teamId查找project列表
     * @param  {[type]}  id [description]
     * @return {Promise}    [description]
     */    
    findPrjsByTeamId: async function (id) {
        return await projectDao.find({teamId: id})
    },
    /**
     * 根据prjId查找prj
     * @param  {[type]id}  id [description]
     * @return {Promise}    [description]
     */
    findPrjById: async function (id) {
        const prj = await projectDao.findOne({id: id})
        return prj
    },
    /**
     * 查找用户信息
     * @param  {[type]}  id [description]
     * @return {Promise}    [description]
     */  
    findUser: async function (user) {
      return await userDao.findOne({username: user.username})
    }        
}

