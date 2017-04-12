'use strict';

import db from '../common/db'

const userDao = db.get('user')

export default {
  /**
   * 登录校验
   * @param  {[Object]}  user [用户对象]
   * @return {Promise}      [Boolean]
   */
  toLogin: async function (username, pwd) {
    console.log('userDao---', db);
    console.log('11111111=', username, pwd);
    const result = await userDao.findOne({ username: username })
    console.log('result---', result);
    if (!!result && result.pwd === pwd) {
      return true
    }
    return false
  }
}
