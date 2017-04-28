<template>
  <div class="prd-panel">
    prd list
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
        curNode: 'prds.curNode'
      })
    }
  }
</script>

<style lang="less" scoped>
.prd-panel {

}
</style>
