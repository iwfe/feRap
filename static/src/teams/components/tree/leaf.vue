/*
 * @Author: zoucong 
 * @Date: 2017-07-06 10:51:05 
 * @Last Modified by: zoucong
 * @Last Modified time: 2017-07-13 16:08:30
 */

<template>
  <div class="tree-leaf-wrp" >
    <a class="leaf-label"
      :style="{paddingLeft: level * 20 + 'px'}"
      :class="{'leaf-label-expanded': expanded, active}" 
      @click="nodeClick(data);"
    >
      <span class="leaf-label-icon">
        <i v-if="expandable" class="el-icon-caret-right label-icon"/>
      </span>
      <span class="leaf-label-content">
        <slot name="label"></slot>
      </span>
    </a>

    <!-- sub tree -->
    <transition v-if="expandable"
      @before-enter = "treeBeforeEnter"
      @enter        = "treeEnter"
      @after-enter  = "treeAfterTrans"
      @before-leave = "treeBeforeLeave"
      @leave        = "treeLeave"
      @after-leave  = "treeAfterTrans"
    >
      <div v-show="expanded">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
  const treeTransClassName = 'expand-tree-transition'
  export default {
    props: ['data', 'level', 'expandable', 'expanded', 'active'],

    methods: {
      nodeClick (data) {
        this.$emit('nodeClick', data)
      },

      // sub expand extend transition
      setTreeHeight (el, height) {
        $(el).css('height', height)
      },
      treeBeforeEnter (el) {
        this.setTreeHeight(el, 0)
        $(el).addClass(treeTransClassName)
      },
      treeEnter (el) {
        this.setTreeHeight(el, el.scrollHeight)
      },
      treeBeforeLeave (el) {
        this.setTreeHeight(el, el.scrollHeight)
        $(el).addClass(treeTransClassName)
      },
      treeLeave (el) {
        setTimeout(() => this.setTreeHeight(el, 0))
      },
      treeAfterTrans (el) {
        $(el).removeClass(treeTransClassName)
        this.setTreeHeight(el, '')
      }
    }
  }
</script>

<style lang="less">
.tree-leaf-wrp{
  .expand-tree-transition {
    overflow: hidden;
    transition: height .3s;
  }

  .leaf-label{
    display: flex;
    align-items: center;
    border-radius: 2px;
    &:hover{
      background-color: #eee;
      cursor: pointer;
    }
    // 选中状态
    &.active{
      background-color: #E5E9F2;
    }
    .leaf-label-icon{
      width: 18px;
    }
    .leaf-label-content{
      flex: 1;
    }
    .label-icon{
      transition: transform .3s;
      transform: rotate(0);
      color: #aaa;
    }
    // 打开状态
    &.leaf-label-expanded{
      .label-icon{
        transform : rotate(90deg);
      }
    }
  }
}
</style>
