import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
export default new Vuex.Store({
  strict: true,
  state: {
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user'))
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setUser (state, user) {
      state.user = user
    },
    logout (state) {
      state.token = ''
    }
  },
  actions: {
    setToken ({commit}, token) {
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = token
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      // localStorage.setItem('user', user)
      localStorage.setItem('user', JSON.stringify(user))
      commit('setUser', user)
    },
    logout ({commit}) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  getters: {
    isUserLoggedIn: state => !!state.token
  }
})
