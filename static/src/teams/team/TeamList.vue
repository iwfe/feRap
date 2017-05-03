<template>
  <div class="team-list-panel">
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="创建人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="date"
        label="创建时间"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="描述"
        :formatter="formatter">
      </el-table-column>
      <el-table-column label="操作">
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
  import { Table, TableColumn, Tag, Button } from 'element-ui'

  export default {
    data () {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          tag: '公司'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '家'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          tag: '公司'
        }]
      }
    },
    components: {
      ElTable: Table,
      ElTableColumn: TableColumn,
      ElTag: Tag,
      ElButton: Button
    },
    computed: {
      ...mapGetters({
        curNode: 'teams.curNode'
      })
    },
    methods: {
      getListData () {
        
      },
      formatter (row, column) {
        return row.address
      },
      filterTag (value, row) {
        return row.tag === value
      },
      handleEdit (index, row) {
        console.log(index, row)
      },
      handleDelete (index, row) {
        console.log(index, row)
      }
    }
  }
</script>

<style lang="less" scoped>
.team-list-panel {

}
</style>
