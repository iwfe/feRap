<template>
  <div class="prj-form-panel">
    <el-dialog title="项目更新" v-model="showForm">
      <el-form ref="form" :rules="rules" :model="form" label-width="90px" size="tiny">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { Dialog, Form, FormItem, Input, Select, Option, Button, Message } from 'element-ui'
  import api from './api.js'

  export default {
    name: 'PrjForm',
    props: {
      dialogFormVisible: Boolean,
      teamId: String,
      prjId: String
    },
    data () {
      return {
        form: {
          name: '',
          description: '',
          teamId: this.teamId
        },
        rules: {
          name: [
            { required: true, message: '请输入项目名称', trigger: 'blur' }
          ]
        }
      }
    },
    components: {
      ElDialog: Dialog,
      ElForm: Form,
      ElFormItem: FormItem,
      ElInput: Input,
      ElSelect: Select,
      ElOption: Option,
      ElButton: Button
    },
    watch: {
      prjId (val) {
        this.initForm()
      }
    },
    computed: {
      showForm () {
        return this.dialogFormVisible
      }
    },
    methods: {
      initForm () {
        const self = this
        if (!self.prjId) {
          self.form = {
            name: '',
            description: '',
            teamId: this.teamId
          }
          return
        }
        api.findPrjById(self.prjId, (res) => {
          self.form = res
        })
      },
      hide (data) {
        this.$emit('hideForm')
      },
      submit () {
        const self = this
        self.$refs['form'].validate((valid) => {
          if (valid) {
            // 保存数据
            api.addOrUpdatePrj(self.form, (data) => {
              Message.success('保存成功')
              self.$emit('updateList') // 更新数据列表
              self.$store.dispatch('teams/getAllTeams') // 更新团队树
            })

            // 隐藏
            this.hide()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
.prj-form-panel {
  height: 100%;
  text-align: left;
  .left-header {
    border-right: 1px solid #eaeefb;
    padding: 8px;
    font-size: 14px;
    color: #ccc;
  }
}
</style>
