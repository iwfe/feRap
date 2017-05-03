<template>
  <div class="left-panel">
    <el-dialog title="收货地址" v-model="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="团队名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth" prop="description">
          <el-input type="textarea" v-model="description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { Dialog, Form, FormItem, Input, Select, Option, Button } from 'element-ui'

  export default {
    props: {
      dialogFormVisible: Boolean
    },
    data () {
      return {
        name: '',
        description: ''
      }
    },
    components: {
      ElTree: Tree
    },
    methods: {
      hide (data) {
        console.log(data)
        this.$store.dispatch('teams.setCurNode', data)
      }
    }
  }
</script>

<style lang="less" scoped>
.left-panel {
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
