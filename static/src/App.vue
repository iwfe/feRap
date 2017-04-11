<template>
  <div id="app">
    <fe-header></fe-header>
    <router-view></router-view>
  </div>
</template>

<script>
import FeHeader from '@/components/FeHeader'
export default {
  name: 'app',
  components: {
    FeHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
  font-size: 12px;
}
</style>
