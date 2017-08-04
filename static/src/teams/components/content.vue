<template>
  <div class="content-panel">
    <div class="content-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, index) in breadcrumbs"
          :key="item.type" :to="{ path: item.path }" replace>
          {{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="content-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Breadcrumb, BreadcrumbItem } from 'element-ui'

  function getBreadcrumbs (params, curNode) {
    const { teamId, projectId, prdId } = params
    const idList = [ teamId, projectId, prdId ]
    const noneIndex = idList.findIndex(d => !d)
    const sliceIndex =
      (noneIndex === -1 ? idList.length : noneIndex) + 1

    const list = ['全部', '团队', '项目', 'prd']
      .slice(0, sliceIndex)
      .map((d, i) => ({
        type: d,
        path: `/teams/${idList.slice(0, i).join('/')}`
      }))
    // add name

    list.reduceRight((acc, cur) => acc
      ? ((cur.name = acc.label), acc.parent) : null, curNode) // eslint-disable-line
    return list
  }

  export default {
    data () {
      return {
      }
    },
    components: {
      ElBreadcrumb: Breadcrumb,
      ElBreadcrumbItem: BreadcrumbItem
    },
    computed: {
      ...mapGetters({
        curNode: 'teams/curNode'
      }),
      breadcrumbs () {
        return this.curNode && this.curNode.label
          ? getBreadcrumbs(this.$route.params, this.curNode)
          : []
      }
    }
  }
</script>

<style lang="less" scoped>
.content-panel {
  height: 100%;
  .content-header {
    border-bottom: 1px solid #eaeefb;
    transition: .2s;
    padding: 12px;
  }
  .content-body {
    border-radius: 4px;
    transition: .2s;
    height: 100%;
  }
}
</style>
