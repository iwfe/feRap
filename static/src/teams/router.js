const Teams = r => require.ensure([], () => r(require('@/teams/Teams')), 'teams')

export default {
  path: '/teams',
  name: 'teams',
  component: Teams
}
