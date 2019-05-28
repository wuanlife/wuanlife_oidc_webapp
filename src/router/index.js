import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'

const Login = resolve => require.ensure([], () => resolve(require('../views/login/index')), 'Login') // 登录
const Signup = resolve => require.ensure([], () => resolve(require('../views/signup/index')), 'Signup') // 注册
const Checkin = resolve => require.ensure([], () => resolve(require('../views/checkin/index')), 'Checkin') // 签到

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
    path: '/checkin',
    component: Checkin
  }
]

const router = new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (store.state.user.uname) { // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next({
        path: '/login',
        query: {return_to: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

export default router
