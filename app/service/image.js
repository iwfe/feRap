import db from '../common/db'
import fse from 'fs-extra'
import path from 'path'
import crypto from 'crypto'
import sutil from '../common/sutil'

const imageDao = db.get('image')
const mime = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/gif': 'gif',
  'image/bmp': 'bmp'
}

export default {
  /**
   *
   * @desc 获取图片
   * @param {string} imgId
   * @returns {Object} image
   */
  getImg: async function (imgId) {
    const image = await imageDao.findOne({
      id: imgId
    })
    return image
  },
  /**
   *
   * @desc 上传图片
   * @param {object} user
   * @param {string} projectId
   * @returns Array
   */
  uploadImg: async function (file) {
    const { mimetype, buffer, filename, size } = file
    const md5Value = crypto.createHash('md5').update(buffer, 'utf8').digest('hex')
    const fileName = `${md5Value}.${mime[mimetype]}`
    const id = await sutil.genId(imageDao)
    const insertImg = await imageDao.insert({
      'id': id,                                // prd ID
      'createTime': Date.now(),               // 创建时间
      'fileName': fileName,                       // prd名称
      'buffer': buffer,                       // 主要功能
      size,
      mimetype
    })
    return {
      id: insertImg.id
    }
  },
  /**
   *
   * @desc 删除图片
   * @param {object} user
   * @param {string} projectId
   * @returns Array
   */
  removeImg: async function (imgId) {

  }
}
