<template>
  <div class="prj-panel">
    prj list
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters({
        curNode: 'prjs.curNode'
      })
    }
  }
</script>

<style lang="less" scoped>
.prj-panel {

}
</style>
