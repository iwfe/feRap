<template>
  <div class="team-list-panel">
    <p class="toolbar"><el-button type="primary" @click="handleAdd" icon="plus" size="small">新增</el-button></p>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column type="expand">
        <template scope="props">
          <div class="team-user-panel">
            <span class="team-user-label">团队成员：</span>
            <span class="user-item" v-for="user in props.row.users">{{user}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createUser"
        label="创建人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述">
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

    <!-- 新增表单 -->
    <team-form
      :dialogFormVisible="dialogFormVisible"
      :teamId="teamId"
      @hideForm="hideForm"
      @updateList="getListData">
    </team-form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Table, TableColumn, Tag, Button } from 'element-ui'
  import TeamForm from './TeamForm'
  import api from './api.js'

  export default {
    data () {
      return {
        dialogFormVisible: false, // 是否显示新增窗口
        teamId: null,
        tableData: []
      }
    },
    components: {
      ElTable: Table,
      ElTableColumn: TableColumn,
      ElTag: Tag,
      ElButton: Button,
      TeamForm
    },
    computed: {
      ...mapGetters({
        curNode: 'teams.curNode'
      })
    },
    mounted () {
      this.getListData()
    },
    methods: {
      getListData () {
        const self = this
        api.getTeamList((data) => {
          console.log(data)
          self.tableData = data
        })
      },
      handleAdd () {
        this.teamId = null
        this.showForm()
      },
      handleEdit (index, row) {
        this.teamId = row.id
        this.showForm()
        console.log(index, row)
      },
      handleDelete (index, row) {
        console.log(index, row)
      },
      hideForm () {
        this.dialogFormVisible = false
      },
      showForm () {
        const self = this
        this.dialogFormVisible = false
        setTimeout(() => {
          self.dialogFormVisible = true
        }, 100)
      }
    }
  }
</script>

<style lang="less" scoped>
.team-list-panel {
  .toolbar {
    text-align: right;
  }
  .team-user-label {
    position: absolute;
    display: inline-block;
    left: -40px;
    top: 10px;
  }
  .team-user-panel {
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

}
</style>
