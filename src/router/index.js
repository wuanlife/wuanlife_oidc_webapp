import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/views/signin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SignIn',
      component: SignIn
    }
  ]
})
