<template>
  <div class="team-list-panel">
    <add-prd></add-prd>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="projectName"
        label="所属项目">
      </el-table-column>
      <el-table-column
        prop="name"
        label="版本号">
      </el-table-column>
      <el-table-column
        prop="jira"
        label="JIRA地址">
        <template scope="scope">
          <a
            :href="scope.row.jira"
            target="_blank"
          >jira</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="testTime"
        label="提测时间"
        min-width="140"
        sortable>
      </el-table-column>
      <el-table-column
        prop="onlineTime"
        label="上线时间"
        min-width="140"
        sortable>
      </el-table-column>
      <el-table-column
        prop="mergeMaster"
        label="是否合master"
        min-width="140">
        <template scope="scope">
          <span>{{scope.row.mergeMaster || '否'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="comment"
        label="备注">
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="140"
      >
        <template scope="scope">
          <el-button
            size="small"
            @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
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
  import AddPrd from './AddPrd'
  import Api from './api.js'

  export default {
    components: {
      ElTable: Table,
      ElTableColumn: TableColumn,
      ElTag: Tag,
      ElButton: Button,
      AddPrd
    },
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
    computed: {
      ...mapGetters({
        curNode: 'teams.curNode'
      })
    },
    mounted () {
      Api.getPrdList().then(res => {
        const { code, data } = res
        if (code === 200) {
          this.tableData = res.data
        }
      })
    },
    methods: {
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
