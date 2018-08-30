import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/Views/Home/Home'
import Accounts from '@/Views/Accounts/Accounts'
import SingleProp from '@/Views/SingleProp/SingleProp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Accounts',
      name: 'Accounts',
      component: Accounts
    },
    {
      path: '/SingleProp/:propID',
      name: 'SingleProp',
      component: SingleProp
    }
  ],
  mode: 'history'
})
