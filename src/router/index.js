import Vue from 'vue'
import Router from 'vue-router'

const Login = resolve => require.ensure([], () => resolve(require('../views/login/index')), 'Login') // 登录
const Signup = resolve => require.ensure([], () => resolve(require('../views/signup/index')), 'Signup') // 注册
const Signin = resolve => require.ensure([], () => resolve(require('../views/signin/index')), 'Signin') // 签到

Vue.use(Router)

export const constantRouterMap = [
  /* { path: '/authredirect', component: authRedirect, hidden: true }, */
  {
    path: '/',
    component: Login
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/signup',
    component: Signup
  },
  {
    path: '/signin',
    component: Signin
  }
]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
