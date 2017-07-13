/*
 * @Author: zoucong 
 * @Date: 2017-07-06 10:52:29 
 * @Last Modified by: zoucong
 * @Last Modified time: 2017-07-13 17:24:23
 */
 
<template>
  <router-link :to="link" class="team-tree-item" replace>
    <span class="tree-label">
      {{data.label}}
      <span v-if="parentsStr" class="sub-label-text">{{parentsStr}}</span>
    </span>
    <span class="tree-star">
      <i class="tree-star-icon"
        :class="{true:'el-icon-star-on',false:'el-icon-star-off'}[isStared]" 
        @click="toggelStar($event)"/>
    </span>
  </router-link>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { getParents } from '../utils'
  
  export default {
    props: ['data', 'level'],
    data () {
      const parents = getParents(this.data)
      parents.pop() // 去掉“全部”

      return {
        parentsStr: this.level === 1 && parents.length 
          ? `( ${parents.map(d => d.label).join(' → ')} )` : null,
        link: '/teams/' + [...parents.map(d => d.id).reverse(), this.data.id].join('/')
      }
    },
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
        event.preventDefault()
      }
    }
  }
</script>

<style lang="less">
  .team-tree-item{
    padding: 8px 26px 8px 0;
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
