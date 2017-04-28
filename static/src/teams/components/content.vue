<template>
  <div class="content-panel">
    <div class="content-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-body">
      <team-list v-if="curNode.type === 1"></team-list>
      <prj-list v-if="curNode.type === 2"></prj-list>
      <prd-list v-if="curNode.type === 3"></prd-list>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Breadcrumb, BreadcrumbItem } from 'element-ui'
  import TeamList from './TeamList'
  import PrjList from './PrjList'
  import PrdList from './PrdList'

  export default {
    data () {
      return {
      }
    },
    components: {
      ElBreadcrumb: Breadcrumb,
      ElBreadcrumbItem: BreadcrumbItem,
      TeamList,
      PrjList,
      PrdList
    },
    computed: {
      ...mapGetters({
        curNode: 'teams.curNode'
      })
    }
  }
</script>

<style lang="less" scoped>
.content-panel {
  .content-header {
    border-bottom: 1px solid #eaeefb;
    transition: .2s;
    padding: 24.5px;
  }
  .content-body {
    border-radius: 4px;
    transition: .2s;
    padding: 24px;
  }
}
</style>
