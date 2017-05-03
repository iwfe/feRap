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
const hotMiddleware = require('../build/dev-server-koa')

const vueEasyRenderer = require('vue-easy-renderer').koaRenderer;

const app = new Koa()
// mongodb
app.use(mongo(config.mongodb))

// views
app.use(views(__dirname + '/view', { extension: 'ejs' }))

// favicon
// app.use(favicon('./view/favicon.ico', { maxAge: config.staticCacheMaxAge }))

// static files
app.use(serve(path.resolve(__dirname, '../static/src/dist')))
// app.use(mount('/static', serve('./static/dist', { maxAge: config.staticCacheMaxAge })))
// app.use(mount('/static', serve(path.resolve(config.uploadImagePath), { maxAge: config.staticCacheMaxAge })))

// vue server render
// const renderer = vueEasyRenderer(path.resolve(__dirname, '../static/src'), {
//   head: {
//     title: 'FeRap',
//     meta: [
//       {charset: 'utf-8'},
//       {name: 'viewport', content: 'width=device-width, initial-scale=1'}
//     ]
//   }
// })
// app.use(renderer)
// app.use(ctx => ctx.vueRender(path.resolve(__dirname, '../static/src/hello_world/hello_world.vue'), {world: 'world33333!'}));

// logger
app.use(logger());

// bodyparser
app.use(bodyParser())

// 安全认证
app.use(security)

// router
app.use(router.routes())

// 404
// app.use(ctx => {
//   // ctx.body = 'This is 404 page! 2333'
//   console.log('is redirect to /login....');
//   ctx.redirect('/login')
// })
//
// hotMiddleware(app)


app.listen(3779);
console.log('server is start: http://localhost:3779/');
