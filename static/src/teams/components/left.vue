<template>
  <div class="left-panel">
    <div class="left-header">
      团队结构
    </div>
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
  import { mapGetters, mapActions } from 'vuex'
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
        teams: 'teams.allTeams'
      })
    },
    components: {
      ElTree: Tree
    },
    methods: {
      handleNodeClick (data) {
        console.log(data)
        this.$store.dispatch('teams.setCurNode', data)
      }
    }
  }
</script>

<style lang="less" scoped>
.left-panel {
  height: 100%;
  text-align: left;
  .left-header {
    border-right: 1px solid #eaeefb;
    padding: 22px;
  }
}
.el-tree {
  height: calc(~"100% - 64px");
  width: 200px;
  border: 1px solid #eaeefb;
}
</style>
