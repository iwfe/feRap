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

app.use(mongo(config.mongodb))

app.use(views(__dirname + '/view', { extension: 'ejs' }))

app.use(serve(path.resolve(__dirname, '../static/dist')))

app.use(logger());

app.use(bodyParser())

app.use(security)

app.use(router.routes())

app.listen(3779);
console.log('server is start: http://localhost:3779/');
