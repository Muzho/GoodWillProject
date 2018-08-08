import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/Views/Home/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    } /*,
    {
      path: '/Dashboard/:id',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/Customers/:id',
      name: 'Customers',
      component: Customers
    }
    */
  ],
  mode: 'history'
})
