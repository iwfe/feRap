<template>
  <div class="api-form-panel">
    <div class="api-header">
      <i class="iconfont el-icon-share"></i>
      {{form.title}}
    </div>
    <el-form class="api-form" ref="form" :model="form" label-width="80px">
      <el-col :span="6">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Form, FormItem, Input, Col } from 'element-ui'
  import api from '../api.js'

  export default {
    props: {
      apiId: String  // apiId

    },
    data () {
      return {
        form: {} // 列表数据
      }
    },
    components: {
      ElForm: Form,
      ElFormItem: FormItem,
      ElInput: Input,
      ElCol: Col

    },
    computed: {

    },
    mounted () {
    },
    methods: {

    }
  }
</script>

<style lang="less" scoped>
.api-form-panel {
  position: absolute;
  right: 0;
  top: 0;
  background: #fff;
  width: 80%;
  height: 100%;
  box-shadow: 0 0 2px 6px rgba(0, 0, 0, 0.1);
  z-index: 999;
  .api-header {
    height: 40px;
    line-height: 40px;
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
    padding: 0 10px;
    .iconfont {
      font-size: 16px;
    }
  }
  .api-form {
    width: 100%;
    padding: 10px;
  }
}
</style>
