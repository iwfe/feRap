const Teams = r => require.ensure([], () => r(require('@/teams/Teams')), 'teams')
const TeamList = r => require.ensure([], () => r(require('@/teams/team/TeamList')), 'teamList')
const PrjList = r => require.ensure([], () => r(require('@/teams/project/PrjList')), 'prjList')
const PrdList = r => require.ensure([], () => r(require('@/teams/prd/PrdList')), 'prdList')
const ApiList = r => require.ensure([], () => r(require('@/teams/api/List')), 'apiList')

export default {
  path: '/teams',
  component: Teams,
  meta: {
    requireLogin: true // 表示该路由需要登录
  },
  children: [
    {
      path: '',
      name: 'teams',
      component: TeamList
    },
    {
      path: ':teamId',
      name: 'teamsPrjList',
      component: PrjList
    },
    {
      path: ':teamId/:projectId',
      name: 'teamsPrdList',
      component: PrdList
    },
    {
      path: ':teamId/:projectId/:prdId',
      name: 'teamsApiList',
      component: ApiList
    }
  ]
}
