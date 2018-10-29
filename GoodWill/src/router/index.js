import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store.js'
import Login from '@/Views/Login'
import Dashboard from '@/Views/Dashboard/Dashboard'
import Cars from '@/Views/Cars/Cars'
import SingleProp from '@/Views/SingleProp/singleProp'
import Land from '@/Views/Land/Land'
import Locality from '@/Views/Localities/Locality'
import UserAccount from '@/Views/User_Accounts/UserAccount'
import singleUserAccount from '@/Views/UserAccount/userAccount'
import Ownership from '@/Views/Ownership/Ownership'
import FeatureFacility from '@/Views/FeatureFacility/FeatureFacility'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Cars',
      name: 'Cars',
      component: Cars,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/SingleProp/:propID',
      name: 'SingleProp',
      component: SingleProp,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Land',
      name: 'Land',
      component: Land,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Locality',
      name: 'Locality',
      component: Locality,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/UserAccount',
      name: 'UserAccount',
      component: UserAccount,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/singleUserAccount',
      name: 'singleUserAccount',
      component: singleUserAccount,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Ownership',
      name: 'Ownership',
      component: Ownership,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/FeatureFacility',
      name: 'FeatureFacility',
      component: FeatureFacility,
      meta: {
        requiresAuth: true
      }
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isUserLoggedIn) {
      next({
        path: '/',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (!store.getters.isUserLoggedIn) {
      next()
    } else { next({ name: 'Dashboard' }) }
  } else { next() }
})

export default router
