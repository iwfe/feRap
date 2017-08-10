<template>
  <div class="upload-img">
    <div class="img-uploader-wrap">
      <el-upload
        class="img-uploader"
        :action="uploadUrl"
        :headers="headers"
        :show-file-list="false"
        :on-success="handleSuccess"
        :before-upload="beforeUpload">
        <img v-if="imageUrl" :src="imageUrl" class="img">
        <i v-else class="el-icon-plus img-uploader-icon"></i>
      </el-upload>
      <i v-if="imageUrl" class="el-icon-close" @click.prevent="deleteImg"></i>
    </div>
  </div>
</template>

<script>
import {
  Upload,
  Dialog,
  Message
} from 'element-ui'
import store from '../store'

const allowTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/bmp']
// unit (mb)
const maxSize = 1

export default {
  name: 'upload-img',
  components: {
    ElUpload: Upload,
    ElDialog: Dialog
  },
  props: {
    maxNum: {
      type: Number,
      default: 1
    },
    imageSrc: {
      type: String,
      default: null
    }
  },
  data () {
    const token = store.getters['login/getLoginStatus']
    console.log(this.imageSrc)
    return {
      uploadUrl: `${window.pageConfig.siteUrl}image/data`,
      headers: token ? { token } : {},
      imageUrl: this.imageSrc
    }
  },
  methods: {
    /**
     * @desc 虽然后端已经做了类型和大小校验，为了严谨性，此处亦做校验
     * @param {file}
     * @return {bool}
     */
    beforeUpload (file) {
      const { type, size } = file
      if (allowTypes.indexOf(type) === -1) {
        Message.error({
          message: `上传的图片只能是 "${allowTypes.join('","')}" 中的一种`
        })
        return false
      }
      if (size > maxSize * 1024 * 1024) {
        Message.error({
          message: `上传的图片不能超过 ${maxSize} mb`
        })
        return false
      }
    },
    handleSuccess (response, file, fileList) {
      const { code, data } = response
      if (code === 200) {
        this.imageUrl = URL.createObjectURL(file.raw)
        this.$emit('img-change', data)
      } else {
        Message.error({
          message: data || '上传失败'
        })
      }
    },
    deleteImg (e) {
      this.imageUrl = ''
      this.$emit('img-change')
    }
  }
}
</script>

<style lang="less">
  .img-uploader {
    font-size: 28px;
    color: #8c939d;
    width: 256px;
    height: 130px;
    line-height: 128px;
    text-align: center;
    border: 1px dashed #d9d9d9;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    transition: color, border .2s;
    .img {
      width: 254px;
      height: 128px;
      display: block;
      border-radius: 4px;
    }
    .img-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 254px;
      height: 128px;
      line-height: 128px;
      text-align: center;
      transition: color .2s;
    }
    &:hover {
      border-color: #20a0ff;
      .el-icon-close {
        display: block;
      }
      .img-uploader-icon {
        color: #828282;
      }
    }
  }
  .img-uploader-wrap{
    display: inline-block;
    position: relative;
    &:hover .el-icon-close{
      display: inline-block;
    }
    .el-icon-close{
      display: none;
      position: absolute;
      top: -12px;
      right: -12px;
      transition: all .2s;
      width: 24px;
      height: 24px;
      font-size: 12px;
      line-height: 24px;
      text-align: center;
      border-radius: 50%;
      background-color:#fff;
      border: 1px solid #757575;
      cursor: pointer;
    }
  }
</style>
