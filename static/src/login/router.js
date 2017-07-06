const Login = r => require.ensure([], () => r(require('@/login/Login')), 'login')

export default [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requireLogin: false
    }
  },
  {
    path: '/regist',
    name: 'regist',
    component: Login,
    meta: {
      requireLogin: false
    }
  }
]
