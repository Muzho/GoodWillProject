// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BreadCrumb from '@/components/BreadCrumb'
import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCoffee } from '@fortawesome/free-solid-svg-icons/faCoffee'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VJumbotron,
  VCard,
  VTabs,
  VForm,
  VTextField,
  VBreadCrumbs,
  transitions
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'
library.add(faCoffee)
// library.add(fab)
// library.add(faFacebookF)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('app-header', Header)
Vue.component('app-footer', Footer)
Vue.component('app-breadcrumb', BreadCrumb)

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VJumbotron,
    VCard,
    VTabs,
    VForm,
    VTextField,
    VBreadCrumbs,
    transitions
  },
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
