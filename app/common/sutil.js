import message from './message';

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
  }
}
