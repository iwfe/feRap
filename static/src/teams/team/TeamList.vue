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
        width="140">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        sortable
        width="140">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述">
      </el-table-column>
      <el-table-column label="操作" width="140">
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
  import { Table, TableColumn, Tag, Button, MessageBox, Message } from 'element-ui'
  import TeamForm from './TeamForm'
  import api from './api.js'

  export default {
    data () {
      return {
        dialogFormVisible: false, // 是否显示新增窗口
        teamId: null,  // 用于编辑删除团队
        tableData: [] // 列表数据
      }
    },
    components: {
      ElTable: Table,
      ElTableColumn: TableColumn,
      ElTag: Tag,
      ElButton: Button,
      MessageBox,
      Message,
      TeamForm
    },
    computed: {
      ...mapGetters({
        curNode: 'teams/curNode'
      })
    },
    mounted () {
      this.getListData()
    },
    methods: {
      // 获取数据列表
      getListData () {
        const self = this
        api.getTeamList((data) => {
          self.tableData = data
        })
      },
      // 新增
      handleAdd () {
        this.teamId = null
        this.showForm()
      },
      // 修改
      handleEdit (index, row) {
        this.teamId = row.id
        this.showForm()
      },
      // 删除team
      handleDelete (index, row) {
        const self = this
        self.teamId = row.id
        MessageBox.confirm(`确认删除团队"${row.name}"么?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.doDelete()
        }).catch((e) => {
          console.warn(' e:', e)
        })
      },
      doDelete () {
        const self = this
        api.delTeam(self.teamId, (res) => {
          Message.success('删除成功')
          self.getListData() // 更新数据列表
          self.$store.dispatch('teams/getAllTeams') // 更新团队树
        })
      },
      // 隐藏显示team
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
    padding:10px 0;
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
