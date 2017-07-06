const ApiList = r => require.ensure([], () => r(require('@/api/List')), 'apis')

export default {
  path: '/api/index',
  name: 'apiList',
  component: ApiList,
  meta: {
    requireLogin: true
  }
}
