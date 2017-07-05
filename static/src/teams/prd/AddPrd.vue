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
          <el-input type="text" v-model="addPrdForm.jira"></el-input>
        </el-form-item>
        <el-form-item label="提测时间" prop="testTime">
          <el-date-picker
            v-model="addPrdForm.testTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上线时间" prop="onlineTime">
          <el-date-picker
            v-model="addPrdForm.onlineTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否合master" prop="mergeMaster">
          <el-switch
            v-model="addPrdForm.mergeMaster"
            on-text="是"
            off-text="否"
            on-color="#13ce66"
            off-color="#ff4949"
            on-value="否"
            off-value="是">
          </el-switch>
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input type="textarea" v-model="addPrdForm.comment"></el-input>
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
  name: 'add-prd',
  components: {
    ElButton: Button,
    ElDialog: Dialog,
    ElForm: Form,
    ElFormItem: FormItem,
    ElInput: Input,
    ElSwitch: Switch,
    ElDatePicker: DatePicker
  },
  computed: mapState({
    projectId: function (state) {
      return state.teams.curNode.id
    }
  }),
  data () {
    return {
      dialogVisible: false,
      addPrdForm: {
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
  methods: {
    handleAdd () {
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
            'projectId': this.projectId,             // 项目id
            'name': form.name,                       // prd名称
            'description': form.description,         // 主要功能
            'jira': form.jira,                   // JIRA地址
            'testTime': form.testTime,               // 提测时间
            'onlineTime': form.onlineTime,           // 上线时间
            'mergeMaster': form.mergeMaster || '否', // 是否合master
            'comment': form.comment                      // 备注
          }
          Api.addPrd(params)
          .then(res => {
            const { code, data } = res
            if (code === 200) {
              this.$emit('callback')
              this.dialogVisible = false
              Message({
                type: 'success',
                message: '新增成功!'
              })
            } else {
              Message({
                type: 'error',
                message: '新增失败!'
              })
            }
          })
          .catch(err => {
            if (err) {
              Message({
                type: 'error',
                message: '新增失败!'
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
  .toolbar{
    text-align: right;
  }
</style>
