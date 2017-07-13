/*
 * @Author: zoucong 
 * @Date: 2017-07-13 16:21:13 
 * @Last Modified by: zoucong
 * @Last Modified time: 2017-07-13 16:59:25
 */

export function getParents (node) {
  if (!node.parent) return []
  return [node.parent, ...getParents(node.parent)]
} 

export function scrollCurNodeToView () {
  const $wrapper = $('.main-left-panel')
  const $active = $wrapper.find('.all-teams .leaf-label.active')
  if ($active.length) {
    const top = $active.position().top
    $wrapper.animate({scrollTop: top}, 300)
  }
}
