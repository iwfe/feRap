// const staticManifest = require('../static/dist/manifest.json')

module.exports = {
  serverPort: 3779,
  passwordKey: 'feRep',  // 加密密码用的，部署时候需要修改
  authKey: 'just some randon words',  // 生成 token 用的，部署时候需要修改
  cookieAuthKey: 'nodeblogauth',  // 存 cookie 的 key
  staticCacheMaxAge: 1000 * 60 * 60 * 24 * 365,
  mongodb: {
    // host: 'localhost',
    host: '127.0.0.1',
    port: 27017,
    db: 'fete'
  },
  // staticUrl: staticManifest,
  uploadImagePath: 'data/upload/images'
}
