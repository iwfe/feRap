<template>
  <div class="content-panel">
    <div class="content-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/teams' }">全部</el-breadcrumb-item>
        <el-breadcrumb-item v-if="curNode.type >= 0">团队</el-breadcrumb-item>
        <el-breadcrumb-item v-if="curNode.type >= 1">项目</el-breadcrumb-item>
        <el-breadcrumb-item v-if="curNode.type >= 2">prd</el-breadcrumb-item>
        <el-breadcrumb-item v-if="curNode.type >= 3">api</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-body">
      <team-list v-if="curNode.type === 0"></team-list>
      <prj-list v-if="curNode.type === 1"></prj-list>
      <prd-list v-if="curNode.type === 2"></prd-list>
      <api-list v-if="curNode.type === 3"></api-list>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Breadcrumb, BreadcrumbItem } from 'element-ui'
  import TeamList from '../team/TeamList'
  import PrjList from '../project/PrjList'
  import PrdList from '../prd/PrdList'
  import ApiList from '../api/ApiList'

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
      PrdList,
      ApiList
    },
    computed: {
      ...mapGetters({
        curNode: 'teams/curNode'
      })
    }
  }
</script>

<style lang="less" scoped>
.content-panel {
  .content-header {
    border-bottom: 1px solid #eaeefb;
    transition: .2s;
    padding: 12px;
  }
  .content-body {
    border-radius: 4px;
    transition: .2s;
    padding: 10px 24px;
  }
}
</style>
