require('babel-register'); //

const mongo = require('koa-mongo')
const mount = require('koa-mount')
const serve = require('koa-static')
const path = require('path')
const views = require('koa-views')
const favicon = require('koa-favicon')
const bodyParser = require('koa-bodyparser')
const Koa = require('koa')
const app = new Koa()
const config = require('./config')
const router = require('./router')

// mongodb
app.use(mongo(config.mongodb))

// views
app.use(views(__dirname + '/view', { extension: 'ejs' }))

// favicon
// app.use(favicon('./view/favicon.ico', { maxAge: config.staticCacheMaxAge }))

// static files
// app.use(mount('/static', serve('./static/dist', { maxAge: config.staticCacheMaxAge })))
// app.use(mount('/static', serve(path.resolve(config.uploadImagePath), { maxAge: config.staticCacheMaxAge })))

// bodyparser
app.use(bodyParser())

// router
app.use(router.routes())

// 404
app.use(ctx => {
  // ctx.body = 'This is 404 page! 2333'
  ctx.redirect('/login')
})

app.listen(3889);
