/*
 * @Author: zoucong 
 * @Date: 2017-07-06 10:50:52 
 * @Last Modified by: zoucong
 * @Last Modified time: 2017-07-06 15:46:24
 */

import Vue from 'vue'
import Leaf from './leaf.vue'

require('./index.less')

export default (LeftItem) => {
  let context // 组件

  const Tree = Vue.extend({
    /**
     * data:        {Object}
     * currentNode: {Object}
     * expendeds:   {Array}
     */
    props: ['data', 'currentNode', 'expendeds'],
    methods: {
      nodeClick (data) {
        this.$emit('nodeClick', data)
      },
      hasChildren (data) {
        return Boolean(data && data.children && data.children.length)
      },
      renderNode (d) {
        const { nodeClick, currentNode, expendeds } = this
        const hasChildren = this.hasChildren(d)
        const expanded = expendeds.indexOf(d.id) !== -1
        const isActive = currentNode === d
        return (
          <li>
            <Leaf data={d} 
              onNodeClick={nodeClick} 
              expandable={hasChildren}
              expanded={expanded}
              active={isActive}
            >
              <LeftItem data={d}/>
              <Tree slot="subTree" 
                // 递归传递
                data={d} 
                onNodeClick={nodeClick}
                expendeds={expendeds}
                currentNode={currentNode}
              />
            </Leaf>
          </li>
        )
      }
    },
    render (h) {
      return (
        <ul class="tree-component-ul">
          {
            this.data.children.map(this.renderNode.bind(this))
          }
        </ul>
      )
    }
  })

  return Tree
}
