/*
 * @Author: zoucong 
 * @Date: 2017-07-06 10:52:29 
 * @Last Modified by: zoucong
 * @Last Modified time: 2017-07-07 19:07:43
 */
 
<template>
  <div class="team-tree-item">
    <span class="tree-label">
      {{data.label}}
      <span v-if="showParents" class="sub-label-text">{{getParentsStr()}}</span>
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
    props: ['data', 'showParents'],
    computed: {
      ...mapGetters({
        starItems: 'teams/starItems'
      }),
      isStared () {
        return this.starItems.indexOf(this.data.id) !== -1
      }
    },
    methods: {
      toggelStar (event) {
        this.$store.dispatch(this.isStared 
          ? 'teams/unStarItem' : 'teams/starItem', this.data.id)
        event.stopPropagation()
      },
      getParentsStr () {
        const pList = getParents(this.data)
        pList.pop() // 删掉全部
        return `(${pList.join(' → ')})`
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
