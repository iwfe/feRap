'use strict';

import crypto from 'crypto'
import db from '../common/db'
import config from '../config'
import sutil from '../common/sutil'

const userDao = db.get('user')

export default {
  /**
   * 登录校验
   * @param  {[type]}  username [用户名]
   * @param  {[type]}  pwd      [密码]
   * @return {Promise}          [description]
   */
  toLogin: async function (ctx, username, pwd) {
    return await this.setLoginUser(ctx, username, pwd); // 将用户信息存储到cookie中
  },

  /**
   * 注册用户
   * @param  {[type]}  username [username]
   * @param  {[type]}  pwd      [pwd]
   * @return {Promise}          [description]
   */
  regist: async function (username, pwd) {
    pwd = this.wrapUserPass(pwd)
    console.log(`insert user username:${username} pwd:${pwd}`);
    const result = await userDao.insert({ username: username, password: pwd })
  },

  findByUserName: async function (username) {
    return await userDao.findOne({ username: username })
  },

  findById: async function (id) {
    return await userDao.findOne({ id: id })
  },

  getLoginUser: async (ctx) => {
    let feteauth = ctx.header.token;

    console.log('user token:', feteauth)

    if (!feteauth){
      return null;
    }

    let decrypted = '';
    let decipher = crypto.createDecipher('rc4', config.authKey);

    try{
      decrypted += decipher.update(feteauth, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
    } catch (e) {
      return null
    }

    let auth = decrypted.split('|');

    let username = auth[0];
    let password = auth[1];
    let ip = ctx.ip;

    let user = await userDao.findOne({
      username: username,
      password: password
    });

    return user;
  },

  //设置登录用户
  async setLoginUser(ctx, username, pwd) {

    pwd = this.wrapUserPass(pwd);

    const user = await userDao.findOne({
      username: username,
      password: pwd
    });

    if (!user) {
      return null;
    }

    const ip = ctx.ip;
    console.log('ip', ip)
    const str = username + '|' + pwd + '|' + ip;
    let encrypted = '';
    const cip = crypto.createCipher('rc4', config.authKey);

    encrypted += cip.update(str, 'utf8', 'hex');
    encrypted += cip.final('hex');

    ctx.cookies.set('feteauth', encrypted);

    // return user
    return encrypted
  },

  wrapUserPass(password) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(password + config.passwordKey);
    md5sum = md5sum.digest('hex');
    return md5sum;
  }
}
