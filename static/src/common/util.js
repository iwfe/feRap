export default {
  /**
   * 将对象的属性前添加root.
   * @param  {[type]} root [属性前缀]
   * @param  {[type]} obj  [对象]
   * @return {[type]}      [对象]
   */
  initRoot: (root, obj) => {
    for (let o in obj) {
      obj[`${root}.${o}`] = obj[o]
      delete obj[o]
    }
    return obj
  }
}
