import message from './message';
import _ from 'underscore';
import utils from '../../global/utils'

export default {

  //json成功返回
  success(ctx, value) {
    ctx.body = {
      code: 200,
      data: value
    }
    return false;
  },

  //json失败返回
  failed(ctx, code) {
    ctx.body = {
      code: code,
      message: message[code] || ''
    }
    return false;
  },

  //页面渲染
  async render(ctx, data = {}) {
    console.log('render.......');
    let staticTag = 'index';
    let pathArr = ctx.path.split('/');
    if (pathArr[1]) {
      staticTag = pathArr[1];
    }
    //为每个页面添加数据
    ctx.locals = ctx.locals || {}
    const user = Object.assign({}, ctx.locals._user);
    delete user._id;
    delete user.teams;
    ctx.locals._user = user;
    await ctx.render(data.tpl || 'index', ctx.locals, data);
  },

  async result(ctx, data) {
    switch (ctx.accepts('json', 'html', 'text')) {
      case 'json':
        if (data.value) {
          return this.success(ctx, data.value);
        }
        if (data.code) {
          return this.failed(ctx, data.code);
        }
        break;
      default:
        if (data.redirect) {
          ctx.redirect(data.redirect);
        } else {
          await this.render(ctx, data);
        }
    }
  },

  isGet(method) {
    return method.toLowerCase() === 'get';
  },

  isPost(method) {
    return method.toLowerCase() === 'post';
  },

  async genId(dao, len = 6) {
    let id = utils.genId(len);
    while (await dao.findOne({
      id: id
    })) {
      id = utils.genId(len);
    }
    return id;
  },
}
