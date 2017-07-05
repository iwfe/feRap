<template>
  <el-button
    size="small"
    type="danger"
    @click="handleDelete">删除</el-button>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { Button, MessageBox, Message } from 'element-ui'
import Api from './api'

export default {
  components: {
    ElButton: Button,
    MessageBox
  },
  props: {
    row: {
      type: Object,
      twoWay: true
    }
  },
  data () {
    return {
      curPrd: {}
    }
  },
  mounted () {
    this.curPrd = Object.assign({}, this.row)
  },
  methods: {
    handleDelete () {
      MessageBox.confirm('此操作将永久删除该PRD, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          id: this.curPrd.id,
          projectId: this.curPrd.projectId
        }
        Api.deletePrd(params)
        .then(res => {
          const { code, data } = res
          if (code === 200) {
            this.$emit('callback')
            this.dialogVisible = false
            Message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            Message({
              type: 'error',
              message: '删除失败!'
            })
          }
        })
        .catch(err => {
          this.dialogVisible = false
          if (err) {
            Message({
              type: 'error',
              message: '删除失败!'
            })
          }
        })
      })
    }
  }
}
</script>
