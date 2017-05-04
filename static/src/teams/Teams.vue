<template>
  <div class="container-panel">
    <!-- 左侧菜单 -->
    <div class="main-left-panel">
      <left></left>
    </div>
    <!-- 右侧内容 -->
    <div class="main-content-panel">
      <teams-content></teams-content>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Left from './components/Left'
  import TeamsContent from './components/Content'

  export default {
    data () {
      return {

      }
    },
    computed: {
      ...mapGetters({
        teams: 'teams.allTeams',
        curNode: 'teams.curNode'
      })
    },
    components: {
      Left,
      TeamsContent
    },
    mounted () {
      this.$store.dispatch('teams.getAllTeams')
    }
  }
</script>

<style lang="less">
.container-panel {
  position: relative;
  width: 100%;
  height: calc(~"100% - 36px");
  display: flex;
  .main-left-panel {
    height: 100%;
  }
  .main-content-panel {
    width: 100%;
    height: 100%;
  }
}
</style>
