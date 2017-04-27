<template>
  <div class="container-panel">
    <div class="main-left-panel">
      <left></left>
    </div>
    <div class="main-content-panel">
      <content></content>
      {{teams}}
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Left from './components/Left'
  import Content from './components/Content'

  export default {
    data () {
      return {

      }
    },
    computed: {
      ...mapGetters({
        teams: 'allTeams'
      })
    },
    components: {
      Left,
      Content
    },
    mounted () {
      this.$store.dispatch('getAllTeams')
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
    height: 100%;
  }
}
</style>
