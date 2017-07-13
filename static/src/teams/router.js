const Teams = r => require.ensure([], () => r(require('@/teams/Teams')), 'teams')
const TeamList = r => require.ensure([], () => r(require('@/teams/team/TeamList')), 'teamList')
const PrjList = r => require.ensure([], () => r(require('@/teams/project/PrjList')), 'prjList')
const PrdList = r => require.ensure([], () => r(require('@/teams/prd/PrdList')), 'prdList')
const ApiList = r => require.ensure([], () => r(require('@/teams/api/List')), 'apiList')

export default {
  path: '/teams',
  name: 'teams',
  component: Teams,
  meta: {
    requireLogin: true // 表示该路由需要登录
  },
  children: [
    {
      path: '',
      component: TeamList
    },
    {
      path: ':teamId',
      component: PrjList
    },
    {
      path: ':teamId/:projectId',
      component: PrdList
    },
    {
      path: ':teamId/:projectId/:prdId',
      component: ApiList
    }
  ]
}
