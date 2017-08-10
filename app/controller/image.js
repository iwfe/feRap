'use strict'

import fse from 'fs-extra'
import crypto from 'crypto'
import { inspect } from 'util'
import send from 'koa-send'
import sutil from '../common/sutil'
import imageService from '../service/image'

// const imgTmpPath = path.join(process.cwd(), './tmp')
const imgTmpPath = './tmp'
const allowTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/bmp']
const mime = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/gif': 'gif',
  'image/bmp': 'bmp'
}
const maxSize = 1 // mb
const notFound = './app/common/not-found.html'

export default {
  root: 'image',
  getImg: async function (ctx, next) {
    const { res } = ctx
    const { imgId } = ctx.locals.parse
    if (!imgId) {
      ctx.status = 404
      await send(ctx, notFound)
      next()
      return
    }
    const image = await imageService.getImg(imgId)
    if (!image) {
      ctx.status = 404
      await send(ctx, notFound)
    } else {
      const { mimetype, buffer, fileName } = image
      const filePath = `${imgTmpPath}/${fileName}`
      // 如果不存在该缓存文件,则先缓存该文件
      if (!fse.existsSync(filePath)) {
        fse.outputFileSync(filePath, buffer.buffer)
      }
      await send(ctx, filePath)
    }
    next()
  },
  uploadImg: async function (ctx, next) {
    const { file } = ctx.req
    if (file) {
      const { mimetype, buffer, filename, size } = file
      // 图片格式
      if (mimetype && allowTypes.indexOf(mimetype) === -1) {
        sutil.failed(ctx, 16002)
        return
      }
      // 图片大小
      if (size / 1024 / 1024 > maxSize) {
        ctx.body = {
          code: 16003,
          data: `上传的图片太大，不能超过${maxSize}mb`
        }
        return
      }
      const image = await imageService.uploadImg(file)
      sutil.success(ctx, image)
    } else {
      sutil.failed(ctx, 1003)
    }
  },
  removeImg: async function (ctx, next) {
    const { imgId } = ctx.locals.parse
    const image = await imageService.removeImg(imgId)
    sutil.success(ctx, image)
  }
}
