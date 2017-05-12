<template>
  <div class="api-list-panel">
    <p class="toolbar"><el-button type="primary" @click="handleAdd" icon="plus" size="small">新增</el-button></p>
    <el-table
      :data="tableData"
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
        label="操作"
        width="140">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Table, TableColumn, Tag, Button, MessageBox, Message } from 'element-ui'
  import api from './api.js'

  export default {
    data () {
      return {
        prdId: this.$route.query.prdId,
        apiId: null,  // 用于编辑删除Api
        tableData: [] // 列表数据
      }
    },
    components: {
      ElTable: Table,
      ElTableColumn: TableColumn,
      ElTag: Tag,
      ElButton: Button,
      MessageBox,
      Message
    },
    computed: {

    },
    mounted () {
      this.getListData()
    },
    methods: {
      // 获取数据列表
      getListData () {
        const self = this
        api.getApiList(self.prdId, (data) => {
          self.tableData = data
        })
      },
      handleAdd () {

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
  .el-table .cell {
    text-align: left;
  }
}
</style>
