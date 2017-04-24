'use strict';

import crypto from 'crypto'
import db from '../common/db'

const userDao = db.get('user')

export default {
  /**
   * 登录校验
   * @param  {[type]}  username [用户名]
   * @param  {[type]}  pwd      [密码]
   * @return {Promise}          [description]
   */
  toLogin: async function (username, pwd) {
    const result = await userDao.findOne({ username: username })
    console.log('result---', result);
    if (!!result && result.pwd === pwd) {
      return true
    }
    return false
  },

  /**
   * 注册用户
   * @param  {[type]}  username [username]
   * @param  {[type]}  pwd      [pwd]
   * @return {Promise}          [description]
   */
  regist: async function (username, pwd) {
    const result = await userDao.findOne({ username: username })
    console.log('result---', result);
    if (!!result && result.pwd === pwd) {
      return true
    }
    return false
  },

  //登录用户cookie管理
  getLoginUser: async (ctx) => {
    console.log(`userService => getLoginUser ctx:${ctx}`);
    let feteauth = ctx.cookies.get('feteauth');
    if (!feteauth) return null;
    let decrypted = '';
    let decipher = crypto.createDecipher('rc4', config.authKey);
    decrypted += decipher.update(feteauth, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    let auth = decrypted.split('|');

    let username = auth[0];
    let password = auth[1];
    let ip = ctx.ip;
    if (!auth[2] || auth[2] != ip) return null;

    let user = await userDao.findOne({
      username: username,
      password: password
    });
    return user;
  },

  //设置登录用户
  async setLoginUser(ctx, username, password) {
    var password = this.wrapUserPass(password);
    var user = await userDao.findOne({
      username: username,
      password: password
    });

    if (!user) {
      return false;
    }

    var ip = ctx.ip;
    var str = username + '|' + password + '|' + ip;
    var encrypted = '';
    var cip = crypto.createCipher('rc4', config.authKey);
    encrypted += cip.update(str, 'utf8', 'hex');
    encrypted += cip.final('hex');
    ctx.cookies.set('feteauth', encrypted);

    // loginUserStore.set(username, user);
  },

  wrapUserPass(password) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(password + config.passwordKey);
    md5sum = md5sum.digest('hex');
    return md5sum;
  }
}
