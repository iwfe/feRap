<template>
  <div class="left-panel">
    <div class="left-header">
      团队结构
    </div>
    <!-- teams list -->
    <div>
      <!-- 星标项 -->
      <h5 class="left-group-title">我的星标</h5>
      <team-tree 
        :data="starTrees"
        :current-node="curNode"
        :expendeds="expendedCollections"
        @nodeClick="(data) => handleNodeClick('expendedCollections',data)"
      />
      <div class="left-split" />

      <!-- 搜索/全部 -->
      <h5 class="left-group-title">我的团队</h5>
      <div class="left-search">
        <el-input v-model="searchItemKw" placeholder="搜索团队/项目" />
      </div>
      <team-tree 
        v-if="displayTeams"
        :data="displayTeams"
        :current-node="curNode"
        :expendeds="expendedNodes"
        @nodeClick="(data) => handleNodeClick('expendedNodes',data)"
      />
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import tree from './tree'
  import LeftItem from './left-item.vue'
  import { Input } from 'element-ui'

  const TeamTree = tree(LeftItem)

  function filterNodeToArrayProvide (filter) {
    return function findFunc (node) {
      if (!node || !node.children) return []
      return node.children.filter(filter)
        .concat(...node.children.map(findFunc))
    }
  }

  export default {
    data () {
      return {
        data: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        searchItemKw: ''
      }
    },
    computed: {
      ...mapGetters({
        teams: 'teams/allTeams',
        starItems: 'teams/starItems',
        curNode: 'teams/curNode',
        expendedNodes: 'teams/expendedNodes',
        expendedCollections: 'teams/expendedCollections'
      }),
      displayTeams () {
        const { searchItemKw, teams } = this
        if (!searchItemKw) return teams[0]
        const findFunc = filterNodeToArrayProvide(d => 
          d.label && d.label.indexOf(searchItemKw) !== -1)

        const children = findFunc(teams[0])
        return { children }
      },
      starTrees () {
        const itemSet = new Set(this.starItems)
        const findFunc = filterNodeToArrayProvide(d => itemSet.has(d.id))
        const children = findFunc(this.teams[0])
        return { children }
      }
    },
    components: {
      TeamTree,
      ElInput: Input
    },
    methods: {
      handleNodeClick (setName, data) {
        this.$store.dispatch('teams/toggleExpends', {setName, nodeId: data.id})
        this.$store.dispatch('teams/setCurNode', data)
      }
    }
  }
</script>

<style lang="less" scoped>
.left-panel {
  height: 100%;
  text-align: left;
  border-right: 1px solid #ddd;
  @sildPadding: 8px;
  .left-header {
    border-right: 1px solid #eaeefb;
    padding: @sildPadding;
    font-size: 14px;
    color: #ccc;
  }
  .left-split{
    border-top: dotted 2px #ddd;
    margin: 10px 0
  }
  .left-group-title{
    margin: 0;
    padding: 4px @sildPadding;
    font-size: 13px;
    font-weight: bold;
  }
  .left-search{
    padding: 12px @sildPadding;
  }
}
</style>
