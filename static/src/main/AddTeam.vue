<template>
  <div class="add-team">
    <el-dialog
      title="增加团队"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <el-form :model="form" :rules="rules" ref="addTeamForm" label-width="100px">
        <el-form-item label="团队名称：" prop="name">
          <el-input type="text" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="团队描述：" prop="description">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="封面图：" prop="description">
          <upload-img @img-change="imgChange"></upload-img>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button :loading="adding" type="primary" @click="submitForm('addTeamForm')">确 定</el-button>
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
import UploadImg from './UploadImg.vue'
import API from './api'

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
      dialogVisible: false,
      adding: false,
      form: {
        name: '',
        description: '',
        imgId: ''
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
    },
    imgChange (data) {
      if (data && data.id) {
        this.form.imgId = data.id
      } else {
        this.form.imgId = ''
      }
    },
    submitForm (formName) {
      const form = this[formName]
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.adding = true
          API.addTeam(this.form).then(res => {
            const { code, data } = res
            this.adding = false
            if (code === 200) {
              this.dialogVisible = false
              this.$emit('add-success', data)
            } else {
              Message.error({
                message: '新增失败！'
              })
            }
          }).catch(err => {
            this.adding = false
            if (err) {
              Message.error({
                message: '新增失败！'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
