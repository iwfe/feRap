<template>
  <div class="prd-inline-block">
    <el-button
      size="small"
      @click="handleUpdate">编辑</el-button>
    <el-dialog
      title="编辑PRD"
      :visible.sync="dialogVisible"
      size="tiny"
      :before-close="handleClose">
      <el-form :model="updateForm" :rules="rules" ref="updateForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name">
          <el-input type="text" v-model="updateForm.name"></el-input>
        </el-form-item>
        <el-form-item label="主要功能" prop="description">
          <el-input type="textarea" v-model="updateForm.description"></el-input>
        </el-form-item>
        <el-form-item label="JIRA地址" prop="jiraAddr">
          <el-input type="text" v-model="updateForm.jira"></el-input>
        </el-form-item>
        <el-form-item label="提测时间" prop="testTime">
          <el-date-picker
            v-model="updateForm.testTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上线时间" prop="onlineTime">
          <el-date-picker
            v-model="updateForm.onlineTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否合master" prop="mergeMaster">
          <el-switch
            v-model="updateForm.mergeMaster"
            on-text="是"
            off-text="否"
            on-color="#13ce66"
            off-color="#ff4949"
            on-value="否"
            off-value="是">
          </el-switch>
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input type="textarea" v-model="updateForm.comment"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('updateForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  Button,
  Dialog,
  Form,
  FormItem,
  Input,
  Switch,
  DatePicker,
  Message
} from 'element-ui'
import Api from './api'

export default {
  name: 'update-prd',
  components: {
    ElButton: Button,
    ElDialog: Dialog,
    ElForm: Form,
    ElFormItem: FormItem,
    ElInput: Input,
    ElSwitch: Switch,
    ElDatePicker: DatePicker
  },
  props: {
    row: {
      type: Object,
      twoWay: true
    }
  },
  data () {
    return {
      dialogVisible: false,
      updateForm: {
        name: '',
        description: '',
        jira: '',
        testTime: '',
        onlineTime: '',
        mergeMaster: 0,
        comment: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入PRD名称', trigger: 'blur' },
          { max: 50, message: '长度不能超过 50 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.updateForm = Object.assign({}, this.row)
  },
  methods: {
    handleUpdate () {
      this.dialogVisible = true
    },
    handleClose (done) {
      this.dialogVisible = false
    },
    submitForm (formName) {
      const form = this[formName]
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = {
            'projectId': this.row.projectId,         // 项目ID
            'id': this.row.id,                       // prd ID
            'name': form.name,                       // prd名称
            'description': form.description,         // 主要功能
            'jira': form.jira,                       // JIRA地址
            'testTime': form.testTime,               // 提测时间
            'onlineTime': form.onlineTime,           // 上线时间
            'mergeMaster': form.mergeMaster || '否', // 是否合master
            'comment': form.comment                  // 备注
          }
          Api.updatePrd(params)
          .then(res => {
            const { code, data } = res
            if (code === 200) {
              this.$emit('callback')
              this.dialogVisible = false
              Message({
                type: 'success',
                message: '更新成功!'
              })
            } else {
              Message({
                type: 'errors',
                message: '更新失败!'
              })
            }
          })
          .catch(err => {
            if (err) {
              Message({
                type: 'errors',
                message: '更新失败!'
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

<style lang="less">
  .prd-inline-block{
    display: inline-block;
  }
</style>
