<template>
  <div class="api-list-panel" @click="isShowForm = false">
    <p class="toolbar">
      <el-button type="primary" @click="handleAdd" icon="plus" size="small">新增</el-button>
    </p>
    <el-table
      :data="apiList"
      @row-click="showForm"
      border
      style="width: 100%">
      <el-table-column
        prop="title"
        label="描述"
        width="300">
      </el-table-column>
      <el-table-column
        prop="url"
        label="链接"
        sortable
        width="300">
      </el-table-column>
      <el-table-column
        prop="method"
        label="方法"
        width="80">
      </el-table-column>
      <el-table-column
        prop="updateDescList"
        label="最后修改">
      </el-table-column>
      <el-table-column
        prop="id"
        width="100"
        label="预览">
      </el-table-column>
    </el-table>
    <!-- 表单 -->
    <!-- <transition name="slide-fade" > -->
      <form-panel v-show="isShowForm" ></form-panel>
    <!-- </transition> -->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Table, TableColumn, Tag, Button, MessageBox, Message } from 'element-ui'
  import FormPanel from './form/FormPanel'
  import api from './api.js'

  export default {
    data () {
      return {
        prdId: this.$route.query.prdId,
        // apiId: null,  // 用于编辑删除Api
        // apiList: [], // 列表数据
        isShowForm: false // 是否显示表单
      }
    },
    components: {
      ElTable: Table,
      ElTableColumn: TableColumn,
      ElTag: Tag,
      ElButton: Button,
      MessageBox,
      Message,
      FormPanel
    },
    computed: {
      ...mapGetters({
        apiList: 'apis/allApis',
        apiId: 'apis/curId'
      })
    },
    mounted () {
      this.getListData()
      document.addEventListener('click', () => {
        // this.isShowForm = false
      })
    },
    methods: {
      // 获取数据列表
      getListData () {
        this.$store.dispatch('apis/getAllApis', this.prdId)
      },
      handleAdd () {

      },
      showForm (row, event) {
        this.isShowForm = true
        console.log(row.id)
        this.$store.dispatch('apis/setCurId', row.id)
        event.stopPropagation()
      }

    }
  }
</script>

<style lang="less" scoped>
.api-list-panel {
  margin: 10px 30px;
  .toolbar {
    text-align: right;
  }
  .api-user-label {
    position: absolute;
    display: inline-block;
    left: -40px;
    top: 10px;
  }
  .api-user-panel {
    text-align: left;
    display: inline-block;
    position: relative;
    padding-left: 34px;
    width: 100%;
  }
  .user-item {
    display: inline-block;
    background: #fff;
    color: #8492A6;
    border-radius: 5px;
    border: 1px solid #D3DCE6;
    padding: 6px 10px;
    margin: 5px;
    font-size: 12px;
  }
  .el-table {
    font-size: 12px;
  }
  .el-table .cell {
    text-align: left;
  }
}

/* 可以设置不同的进入和离开动画 */
@keyframes slideIn {
  from {
    transform: translate3d(100%, 0, 0);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  to {
    transform: translate3d(100%, 0, 0);
    opacity: 0;
  }
}

.slide-fade-enter-active {
  animation: slideIn .3s ease-in;
}

.slide-fade-leave-active {
  animation: slideOut .3s ease-out;
}

.slide-fade-enter, .slide-fade-leave-to {
  z-index: 1;
}
</style>
