<template>
  <div class="upload-img">
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :show-file-list="images.length < maxNum"
      :file-list="images"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
      <i
        class="el-icon-plus"
        v-if="images.length < maxNum"
      ></i>
    </el-upload>
    <el-dialog v-model="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import {
  Upload,
  Dialog
} from 'element-ui'

export default {
  name: 'upload-img',
  components: {
    ElUpload: Upload,
    ElDialog: Dialog
  },
  props: {
    maxNum: {
      type: Number,
      default: 3
    },
    images: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
</style>
