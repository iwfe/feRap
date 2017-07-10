const Teams = r => require.ensure([], () => r(require('@/teams/Teams')), 'teams')

export default {
  path: '/teams/index',
  name: 'teams',
  component: Teams,
  meta: {
    requireLogin: true // 表示该路由需要登录
  }
}
