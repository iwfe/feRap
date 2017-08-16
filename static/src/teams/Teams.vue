<template>
  <div class="container-panel" :class="{'left-hide': !showLeft}">
    <div title="展开/收起侧边栏" class="switch-left-btn" @click="e => showLeft = !showLeft">
      <i class="el-icon-arrow-left switch-left-icon"></i>
    </div>
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
  import { getParents, scrollCurNodeToView } from './utils'

  export default {
    data () {
      return {
        showLeft: true
      }
    },
    computed: {
      ...mapGetters({
        teams: 'teams/allTeams',
        curNode: 'teams/curNode'
      })
    },
    components: {
      Left,
      TeamsContent
    },
    beforeRouteUpdate (to, from, next) {
      this.$store.dispatch('teams/setCurNode', to.params)
      next()
    },
    async mounted () {
      await this.$store.dispatch('teams/getAllTeams')
      this.$store.dispatch('teams/setCurNode', this.$route.params)
      // 展开当前
      const parents = getParents(this.curNode)
      this.$store.dispatch('teams/addExpends',
        { setName: 'expendedNodes', nodeIds: parents.map(d => d.id) })
      // 当前滑到页面
      setTimeout(scrollCurNodeToView, 1000)
    }
  }
</script>

<style lang="less">
.container-panel {
  @left-width: 320px;
  @transition-time: .5s;
  display: flex;
  position: relative;
  height: calc(~"100% - 64px");
  margin-left: 0;
  transition: margin-left @transition-time;
  overflow: hidden;
  .main-left-panel {
    width: @left-width;
    height: 100%;
    overflow-y: scroll;
    border-right: 1px solid #ddd;
  }
  .main-content-panel {
    flex: 1;
    height: 100%;
    overflow-y: scroll;
    height: 100%;
  }
  .switch-left-btn{
    position: absolute;
    top: 50%;
    left: @left-width;
    width: 24px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    box-shadow: 0 0 10px #bbb;
    font-size: 20px;
    z-index: 300;
    background: #fff;
    cursor: pointer;
    opacity: .3;
    transform: translate(-100%, -50%);
    transition: opacity @transition-time,
       transform @transition-time @transition-time;
    &:hover{
      opacity: 1;
    }
  }
  .switch-left-icon {
    transition: transform @transition-time;
  }
  &.left-hide{
    margin-left: -@left-width;
    .switch-left-icon{
      transform: rotate(180deg);
    }
    .switch-left-btn{
      transform: translate(0, -50%);
    }
  }
}
</style>
