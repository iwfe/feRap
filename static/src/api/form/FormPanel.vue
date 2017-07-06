<template>
  <div id="apiform" class="api-form-panel" @click.stop>
    <div class="api-header">
      <i class="iconfont el-icon-share"></i>
      {{form.title}}
    </div>
    <el-form class="api-form" ref="form" :model="form" label-width="80px">
      <el-col :span="6">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="URL">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="Method">
          <el-select v-model="form.method" placeholder="method">
            <el-option label="GET" value="GET"></el-option>
            <el-option label="POST" value="POST"></el-option>
            <el-option label="PUT" value="PUT"></el-option>
            <el-option label="DELETE" value="DELETE"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="返回output数据" label-width="120px">
            <el-switch
              v-model="form.useOutputJson"
              on-text=""
              off-text=""
              on-value="true"
              off-value="false">
            </el-switch>
          </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="接口分类">
          <el-input v-model="form.category"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <editor-frame
            :listActive="form"
            :output-model.sync="form.output"
            :output-json.sync="form.outputJson"
            :input-json.sync="form.input"
            :input-model.sync="form.inputModel"
            :is-add.sync="isAdd"
            :editor-error.sync="editorError"></editor-frame>
      </el-col>
      <el-col :span="20">
        <el-form-item label="修改说明">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <div>
          <p>接口修改日志</p>
          <div v-for="item in form.updateDescList">
            <p>{{item.userName}}</p>
            <p>{{item.updateTime}}: {{item.updateDesc}}</p>
          </div>
        </div>
      </el-col>
    </el-form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Form, FormItem, Input, Select, Option, Switch, Col } from 'element-ui'
  import EditorFrame from '../editor/editor_frame'
  import api from '../api.js'

  export default {
    name: 'apiForm',
    data () {
      return {
        isAdd: true,
        editorError: {},
        form: {
          method: 'GET',
          useOutputJson: true
        } // 列表数据
      }
    },
    components: {
      ElForm: Form,
      ElFormItem: FormItem,
      ElInput: Input,
      ElSelect: Select,
      ElOption: Option,
      ElSwitch: Switch,
      ElCol: Col,
      EditorFrame
    },
    watch: {
      apiId (val) {
        this.getData()
      }
    },
    computed: {
      ...mapGetters({
        apiId: 'apis/curId'
      })
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData () {
        console.log(`form getData....`)
        if (!this.apiId) return
        api.getApiDetail(this.apiId, (data) => {
          this.form = data
        })
      }
    }
  }
</script>

<style lang="less">
.api-form-panel {
  position: absolute;
  right: 0;
  top: 0;
  background: #fff;
  width: 80%;
  height: 100%;
  box-shadow: 0 0 2px 6px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
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

#apiform .el-form-item {
  margin-bottom: 10px;
}
#apiform .el-form-item__content {
  line-height: 26px;
}
#apiform .el-form-item__label {
  font-size: 12px;
  padding: 6px 12px 6px 0;
}
#apiform .el-input__inner {
  height: 26px;
  font-size: 12px;
}
</style>
