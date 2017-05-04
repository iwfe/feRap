<template>
  <div class="left-panel">
    <div class="left-header">
      团队结构
    </div>
    <el-tree :data="teams"
          :props="defaultProps"
          @node-click="handleNodeClick"
          :expand-on-click-node=false
          node-key="id"
          ref="tree"
          :highlight-current=true
          :default-expanded-keys="defaultExpandedKeys">
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
        },
        defaultExpandedKeys: [0]
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
    padding: 8px;
    font-size: 14px;
    color: #ccc;
  }
}
.el-tree {
  height: calc(~"100% - 37px");
  width: 200px;
  border: 1px solid #eaeefb;
  overflow: auto;
}
</style>
