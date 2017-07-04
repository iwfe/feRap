<template>
  <div>
    <p class="toolbar">
      <el-button type="primary" @click="handleAdd" icon="plus" size="small">新增</el-button>
    </p>
    <el-dialog
      title="新增PRD"
      :visible.sync="dialogVisible"
      size="tiny"
      :before-close="handleClose">
      <el-form :model="addPrdForm" :rules="rules" ref="addPrdForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name">
          <el-input type="text" v-model="addPrdForm.name"></el-input>
        </el-form-item>
        <el-form-item label="主要功能" prop="description">
          <el-input type="textarea" v-model="addPrdForm.description"></el-input>
        </el-form-item>
        <el-form-item label="JIRA地址" prop="jiraAddr">
          <el-input type="text" v-model="addPrdForm.jiraAddr"></el-input>
        </el-form-item>
        <el-form-item label="提测时间" prop="testTime">
          <el-input type="text" v-model="addPrdForm.testTime"></el-input>
        </el-form-item>
        <el-form-item label="上线时间" prop="onLineTime">
          <el-input type="text" v-model="addPrdForm.onLineTime"></el-input>
        </el-form-item>
        <el-form-item label="是否合master" prop="mergedMaster">
          <el-switch
            v-model="addPrdForm.mergedMaster"
            on-text="是"
            off-text="否"
            on-color="#13ce66"
            off-color="#ff4949"
            on-value="0"
            off-value="1">
          </el-switch>
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input type="textarea" v-model="addPrdForm.memo"></el-input>
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
  Switch
} from 'element-ui'
import Api from './api'

export default {
  name: 'add-prd',
  components: {
    ElButton: Button,
    ElDialog: Dialog,
    ElForm: Form,
    ElFormItem: FormItem,
    ElInput: Input,
    ElSwitch: Switch
  },
  data () {
    return {
      dialogVisible: false,
      addPrdForm: {
        name: '',
        description: '',
        jiraAddr: '',
        testTime: '',
        onLineTime: '',
        mergedMaster: 0,
        memo: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入PRD名称', trigger: 'blur' },
          { max: 50, message: '长度不能超过 50 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleAdd () {
      this.dialogVisible = true
      Api.getPrdList().then(res => {
        console.log(res)
      })
    },
    handleClose (done) {
      this.dialogVisible = false
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            // const params = {
            //     username: this[formName].username,
            //     password: this[formName].password
            // }
            // this.$http.post("/api/user/login", params)
            // .then(res => {
            //     if(res.body && res.body.code == 1){
            //         this.loginSuccess()
            //     }else{
            //         this.loginFail()
            //     }
            // }, err => {
            //     this.loginFail()
            // })
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

<style lang="less">
  .toolbar{
    text-align: right;
  }
</style>
