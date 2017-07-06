
const storeSuffix = 'feRap'

export const store = {
  getKey: (key) => storeSuffix + '.' + key,
  getItem (k) {
    const key = store.getKey(k)
    return JSON.parse(localStorage.getItem(key))
  },
  setItem (k, v) {
    const key = store.getKey(k)
    const value = JSON.stringify(v)
    return localStorage.setItem(key, value)
  },
  deleteItem (k) {
    const key = store.getKey(k)
    return localStorage.deleteItem(key)
  }
}
