/*
 * @Author: zoucong 
 * @Date: 2017-07-06 10:50:52 
 * @Last Modified by: zoucong
 * @Last Modified time: 2017-07-13 18:51:36
 */

import Vue from 'vue'
import Leaf from './leaf.vue'
require('./index.less')

export default Vue.extend({
  /**
   * data:        {Object}
   * currentNode: {Object}
   * expendeds:   {Array}
   * LeftItem:    {Vue}
   */
  props: ['data', 'currentNode', 'expendeds', 'LeftItem'],
  methods: {
    nodeClick (data) {
      this.$emit('nodeClick', data)
    },
    
    hasChildren (data) {
      return Boolean(data && data.children && data.children.length)
    },

    renderTree (h, data, level) {
      return (
        <ul class="tree-component-ul">
          { 
            data.children.map(d => (
              <li key={d.id}>
                {this.renderNode(h, d, level)}
              </li>
            ))
          }
        </ul>
      )
    },

    renderNode (h, data, level) {
      const { nodeClick, currentNode, expendeds, LeftItem } = this
      const hasChildren = this.hasChildren(data)
      const expanded = expendeds.indexOf(data.id) !== -1
      const isActive = currentNode === data
      
      return (
        <Leaf data={data} 
          level={level}
          onNodeClick={nodeClick} 
          expandable={hasChildren}
          expanded={expanded}
          active={isActive}
        >
          <LeftItem data={data} level={level} slot="label"/>
          { hasChildren ? this.renderTree(h, data, level + 1) : null }
        </Leaf>
      )
    }
  },
  
  render (h) {
    const level = 1
    return this.renderTree(h, this.data, level)
  }
})
