'use strict';

import db from '../common/db'
import sutil from '../common/sutil'
import utils from '../../global/utils'
import _ from 'underscore'

const userDao = db.get('user')
const prdDao = db.get('prd')
const apiDao = db.get('api')

// console.log('======================userDao====================', userDao)

export default {
    /**
   * 查找团队树
   * @param  {[type]}  user [description]
   * @return {Promise}      [description]
   */
    getUserTeam: async function () {
        return userDao.find({username: 'lancui'})
    },
}