// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from 'store'
// 引入图标
import './assets/fonts/iconfont.css'
import './styles/index.scss'
// elemen-ui组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// cookie
import VueCookie from './plugin/vue-cookie'
// 表单验证
import '../static/validate.js'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueCookie)

// register global progress.
const blackList = ['inform', 'collection-not'] // 重定向黑名单
router.beforeEach((to, from, next) => {
  // NProgress.start() // 开启Progress
  if (to.meta.title) {
    // 如果设置标题，拦截后设置标题
    document.title = to.meta.title
  }
  const token = false
  if (token) {
    // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (blackList.indexOf(to.name) === -1) {
      // 不在录重定向黑名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      // NProgress.done() // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
