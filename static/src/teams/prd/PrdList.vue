<template>
  <div class="team-list-panel">
    <add-prd v-on:callback="callback"></add-prd>
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
        <template scope="scope">
          <span>{{formatDate(scope.row.testTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="onlineTime"
        label="上线时间"
        min-width="140"
        sortable>
        <template scope="scope">
          <span>{{formatDate(scope.row.onlineTime)}}</span>
        </template>
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
        prop="description"
        label="主要功能">
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
          <update-prd :row="scope.row" @callback="callback"></update-prd>
          <delete-prd :row="scope.row" @callback="callback"></delete-prd>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  import { Table, TableColumn, Tag, Button } from 'element-ui'
  import AddPrd from './AddPrd'
  import UpdatePrd from './UpdatePrd'
  import DeletePrd from './DeletePrd'
  import Api from './api.js'
  import moment from 'moment'

  export default {
    components: {
      ElTable: Table,
      ElTableColumn: TableColumn,
      ElTag: Tag,
      ElButton: Button,
      AddPrd,
      UpdatePrd,
      DeletePrd
    },
    data () {
      return {
        tableData: []
      }
    },
    computed: mapState({
      projectId: function (state) {
        return state.teams.curNode.id
      }
    }),

    mounted () {
      this.queryData(this.projectId)
    },
    watch: {
      projectId (curVal) {
        this.queryData(curVal)
      }
    },
    methods: {
      formatter (row, column) {
        return row.address
      },
      filterTag (value, row) {
        return row.tag === value
      },
      formatDate (time) {
        time = moment(time).format('YYYY-MM-D HH:mm:ss')
        return time
      },
      queryData (id) {
        Api.getPrdList({
          projectId: id
        }).then(res => {
          const { code, data } = res
          if (code === 200) {
            this.tableData = res.data
          }
        })
      },
      callback () {
        this.queryData(this.projectId)
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
