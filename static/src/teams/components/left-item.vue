/*
 * @Author: zoucong 
 * @Date: 2017-07-06 10:52:29 
 * @Last Modified by: zoucong
 * @Last Modified time: 2017-07-10 10:22:41
 */
 
<template>
  <div class="team-tree-item">
    <span class="tree-label">
      {{data.label}}
      <span v-if="parentsStr" class="sub-label-text">{{parentsStr}}</span>
    </span>
    <span class="tree-star">
      <i class="tree-star-icon"
        :class="{true:'el-icon-star-on',false:'el-icon-star-off'}[isStared]" 
        @click="toggelStar($event)"/>
    </span>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  function getParents (node) {
    if (!node.parent) return []
    return [node.parent.label, ...getParents(node.parent)]
  }

  export default {
    props: ['data', 'level'],
    computed: {
      ...mapGetters({
        starItems: 'teams/starItems'
      }),
      isStared () {
        return this.starItems.indexOf(this.data.id) !== -1
      },
      parentsStr () {
        if (this.level !== 1) return 
        const pList = getParents(this.data)
        pList.pop() // 去掉“全部”
        if (pList.length) return `( ${pList.join(' → ')} )`
      }
    },
    methods: {
      toggelStar (event) {
        this.$store.dispatch(this.isStared 
          ? 'teams/unStarItem' : 'teams/starItem', this.data.id)
        event.stopPropagation()
      }
    }
  }
</script>

<style lang="less">
  .team-tree-item{
    display: flex;
    .tree-label{
      flex: 1;
    }
    .tree-star{
      padding-right: 16px;
      color: #e84a01;
    }
    .sub-label-text{
      padding: 5px;
      color: #8492A6;
    }
  }
  // 空星hover显示
  .team-tree-item .el-icon-star-off{
    display: none;
  }
  .leaf-label:hover{
    .team-tree-item .el-icon-star-off{
      display: inline-block;
    }
  }
</style>
