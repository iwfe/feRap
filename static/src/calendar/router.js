const Calendar = r => require.ensure([], () => r(require('@/calendar/Calendar')), 'calendar')

export default {
  path: '/calendar',
  name: 'calendar',
  component: Calendar
}
