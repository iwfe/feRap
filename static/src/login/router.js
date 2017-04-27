const Login = r => require.ensure([], () => r(require('@/login/Login')), 'login')

export default [{
  path: '/login',
  name: 'login',
  component: Login
}, {
  path: '/regist',
  name: 'regist',
  component: Login
}]
