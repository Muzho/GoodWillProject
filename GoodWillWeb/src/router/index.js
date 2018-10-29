import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/Views/Home/Home'
import Accounts from '@/Views/Accounts/Accounts'
import Developments from '@/Views/Developments/Developments'
import Rent from '@/Views/Rent/Rent'
import Sale from '@/Views/Sale/Sale'
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
      path: '/Developments',
      name: 'Developments',
      component: Developments
    },
    {
      path: '/Rent',
      name: 'Rent',
      component: Rent
    },
    {
      path: '/Sale',
      name: 'Sale',
      component: Sale
    },
    {
      path: '/SingleProp/:propID',
      name: 'SingleProp',
      component: SingleProp
    }
  ],
  mode: 'history'
})
