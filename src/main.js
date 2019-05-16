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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
