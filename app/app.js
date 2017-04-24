require('babel-register'); //

const mongo = require('koa-mongo')
const mount = require('koa-mount')
const serve = require('koa-static')
const logger = require('koa-logger')
const views = require('koa-views')
const favicon = require('koa-favicon')
const bodyParser = require('koa-bodyparser')
const Koa = require('koa')
const path = require('path')
const config = require('./config')
const router = require('./router')
const security = require('./middleware/security')

const app = new Koa()
// mongodb
app.use(mongo(config.mongodb))

// views
app.use(views(__dirname + '/view', { extension: 'ejs' }))

// favicon
// app.use(favicon('./view/favicon.ico', { maxAge: config.staticCacheMaxAge }))

// static files
// app.use(mount('/static', serve('./static/dist', { maxAge: config.staticCacheMaxAge })))
// app.use(mount('/static', serve(path.resolve(config.uploadImagePath), { maxAge: config.staticCacheMaxAge })))

// logger
app.use(logger());

// bodyparser
app.use(bodyParser())

// 安全认证
app.use(security)

// router
app.use(router.routes())

// 404
app.use(ctx => {
  // ctx.body = 'This is 404 page! 2333'
  ctx.redirect('/login')
})

app.listen(3779);
console.log('server is start: http://localhost:3779/');
