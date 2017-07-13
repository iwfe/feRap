<template>
  <div class="prj-panel">
    <p class="toolbar"><el-button type="primary" @click="handleAdd" icon="plus" size="small">新增</el-button></p>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="项目名称"
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
        label="项目描述">
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

    <!-- 编辑删除对话框 -->
    <prj-form
      :dialogFormVisible="dialogFormVisible"
      :teamId="teamId"
      :prjId="prjId"
      @hideForm="hideForm"
      @updateList="updateList">
    </prj-form>
  </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  import { Table, TableColumn, Tag, Button, MessageBox, Message } from 'element-ui'
  import PrjForm from './PrjForm.vue'
  import api from './api.js'
  export default {
    data () {
      return {
        dialogFormVisible: false, // 是否显示新增窗口
        prjId: null,  // 用于编辑删除项目
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
      PrjForm
    },    
    computed: mapState({
      teamId: state => state.teams.curNode.id
    }),
    mounted () {
      updateList:this.getListData(this.teamId)
    },
    watch: {
      teamId (val) {
        this.getListData(val)
      }
    },
    methods: {
      // 获取项目列表
      getListData (id) {
        const self = this
        api.getPrjList(id, (data) => {
          self.tableData = data
        })
      },
      // 新增项目
      handleAdd () {
        this.prjId = null
        this.showForm()
      },
      // 修改项目
      handleEdit (index, row) {
        this.prjId = row.id
        this.showForm()
      },
      // 删除项目
      handleDelete (index, row) {
        const self = this
        self.prjId = row.id
        MessageBox.confirm(`确认删除项目"${row.name}"么?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.doDelete()
        })
      },
      doDelete () {
        const self = this
        api.delPrj(self.prjId, (res) => {
          Message.success('删除成功')
          self.updateList() // 更新数据列表
          self.$store.dispatch('teams/getAllTeams') // 更新团队树
        })
      },
      // 编辑删除对话框隐藏显示
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
.prj-panel {
  .toolbar {
    text-align: right;
  }
}
</style>
