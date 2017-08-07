<template>
  <div class="edit-team">
    <el-dialog
      title="新增PRD"
      :visible.sync="dialogVisible"
      size="tiny"
      :before-close="handleClose"
    >
      <el-form :model="form" :rules="rules" ref="addPrdForm" label-width="100px">
        <el-form-item label="团队名称" prop="name">
          <el-input type="text" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="团队描述" prop="description">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="团队logo" prop="description">
          <upload-img
            :maxNum="1"
            :images="[{url: ''}]"
          ></upload-img>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addPrdForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  Button,
  Dialog,
  Form,
  FormItem,
  Input,
  Message
} from 'element-ui'
import UploadImg from '../components/UploadImg.vue'

export default {
  name: 'edit-team',
  components: {
    ElButton: Button,
    ElDialog: Dialog,
    ElForm: Form,
    ElFormItem: FormItem,
    ElInput: Input,
    UploadImg
  },
  data () {
    return {
      dialogVisible: true,
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入团队名称', trigger: 'blur' },
          { max: 50, message: '长度不能超过 50 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleClose (done) {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
