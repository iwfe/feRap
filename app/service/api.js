'use strict';

import db from '../common/db'
import sutil from '../common/sutil'
import utils from '../../global/utils'
import _ from 'underscore'

const userDao = db.get('user')
const prdDao = db.get('prd')
const apiDao = db.get('api')

export default {
  /**
   * [getApiList description]
   * @param  {[type]}  user [description]
   * @return {Promise}      [description]
   */
  getApiList: async function (prdId) {
    return apiDao.find({prdId: prdId})
  },
  /**
   * [getApiDetail description]
   * @param  {[type]}  prdId [description]
   * @return {Promise}       [description]
   */
  getApiDetail: async function (apiId) {
   return apiDao.findOne({id: apiId})
  }
}
