<template>
  <div id="app">
    <fe-header v-if="isLogin !== true"></fe-header>
    <router-view></router-view>
  </div>
</template>

<script>
import FeHeader from '@/components/FeHeader'
export default {
  name: 'app',
  computed: {
    isLogin () {
      const path = this.$route.path
      return (path.indexOf('regist') > 0 || path.indexOf('login') > 0)
    }
  },
  components: {
    FeHeader
  }
}
</script>

<style lang="less">
  #app {
    height: 100%;
    overflow: hidden;
  }
</style>
