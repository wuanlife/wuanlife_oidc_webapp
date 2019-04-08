import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import profile from './modules/profile'
import getters from './getters'

import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['user']
})

const store = new Vuex.Store({
  modules: {
    user,
    profile
  },
  getters,
  plugins: [vuexLocal.plugin]
})

export default store
