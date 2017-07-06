<template>
  <el-row class="container-panel">
    <!-- 左侧菜单 -->
    <el-col :md="5" class="main-left-panel">
      <left></left>
    </el-col>
    <!-- 右侧内容 -->
    <el-col :md="19" class="main-content-panel">
      <teams-content></teams-content>
    </el-col>
  </el-row>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Row, Col } from 'element-ui'
  import Left from './components/Left'
  import TeamsContent from './components/Content'

  export default {
    data () {
      return {

      }
    },
    computed: {
      ...mapGetters({
        teams: 'teams/allTeams',
        curNode: 'teams/curNode'
      })
    },
    components: {
      ElRow: Row,
      ElCol: Col,
      Left,
      TeamsContent
    },
    mounted () {
      this.$store.dispatch('teams/getAllTeams')
    }
  }
</script>

<style lang="less">
.container-panel {
  position: relative;
  height: calc(~"100% - 36px");
  .main-left-panel {
    height: 100%;
  }
  .main-content-panel {
    height: 100%;
  }
}
</style>
