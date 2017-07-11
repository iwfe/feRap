'use strict';

import db from '../common/db'
import sutil from '../common/sutil'
import utils from '../../global/utils'
import _ from 'underscore'

const prdDao = db.get('prd')
const projectDao = db.get('project')

export default {
    /**
     * 查找prd
     * @param  {[type]}  user [description]
     * @return {Promise}      [description]
     */
    getPrd: async function (teamIds) {
        return prdDao.find({teamId: {'$in': teamIds}})
    },
    /**
    * 查找项目
    * @param  {[type]}  user [description]
    * @return {Promise}      [description]
    */
    getprjs: async function (teamIds) {
        return projectDao.find({teamId: {'$in': teamIds}})
    }
}