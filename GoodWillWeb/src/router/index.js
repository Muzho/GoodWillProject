import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/Views/Home/Home'
import Accounts from '@/Views/Accounts/Accounts'
import Region from '@/Views/Region/Region'
import City from '@/Views/City/city'
import Area from '@/Views/Area/area'
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
      path: '/Region/:regionID',
      name: 'Region',
      component: Region
    },
    {
      path: '/City/:cityID',
      name: 'City',
      component: City
    },
    {
      path: '/Area/:areaID',
      name: 'Area',
      component: Area
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
