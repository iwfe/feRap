import userService from '../service/user'
import sutil from '../common/sutil'
import _ from 'underscore'

const ACCEPT_URLS = [
  '/index'
]

// 是否需要验证权限
const isVerifyUrl = (url) => {
  for (let i = 0; i < ACCEPT_URLS.length; i++) {
    const accUrl = ACCEPT_URLS[i]
    if (accUrl.indexOf(url) !== -1) {
      return true
    }
  }
  return false
}

module.exports = async function (ctx, next) {

  // 不需要验证，则跳过
  if (!isVerifyUrl(ctx.url)) {
    return next()
  }

  // 设置公共参数
  ctx.locals = {}

  ctx.set({
    'Pragma': 'No-cache',
    'Cache-Control': 'no-cache'
  });

  // 设置参数
  ctx.locals.host = config.host;
  ctx.locals._now = new Date().getTime();
  let p = ctx.query;
  try {
    p = _.extend(p, ctx.request.body, ctx.params);
  } catch (e) {
  }
  ctx.parse = p;

  // 判断用户是否登录
  var user = _.extend({}, await userService.getLoginUser(ctx));
  console.log(`username=${user.username}`);
  if (!user.username) {
    return await sutil.result(ctx, {
      code: 10001,
      redirect: '/login?next=' + ctx.url
    });
  }
  delete user.password;
  ctx.locals._user = user;

  // 页面404跳转
  try {
    var status = ctx.status || 404;
    if (status === 404) ctx.throw(404);

  } catch (error) {
    ctx.status = error.status || 500;
    console.log(error.stack);
    if (ctx.status === 404) {
      await ctx.render('error', {
        error
      });
    } else {
      await ctx.render('error', {
        error
      });
    }
  }

  return next()
}
