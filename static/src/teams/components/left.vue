<template>
  <div class="left-panel">
    <el-tree :data="teams"
          :props="defaultProps"
          @node-click="handleNodeClick"
          default-expand-all=""
          :expand-on-click-node=false
          node-key="id"
          ref="tree"
          highlight-current>
    </el-tree>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Tree } from 'element-ui'

  export default {
    data () {
      return {
        data: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    computed: {
      ...mapGetters({
        teams: 'allTeams'
      })
    },
    components: {
      ElTree: Tree
    },
    methods: {
      handleNodeClick (data) {
        console.log(data)
      }
    }
  }
</script>

<style lang="less" scoped>
.left-panel {
  height: 100%;
  text-align: left;
}
.el-tree {
  height: 100%;
  width: 200px;
}
</style>
