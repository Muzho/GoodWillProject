// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { sync } from 'vuex-router-sync'
import store from '@/store/store'
import Axios from 'axios'
import VueCarousel from 'vue-carousel'
import ECharts from 'vue-echarts/components/ECharts'
import Bars from 'vuebars'
// import Lingallery from 'lingallery'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import BreadCrumb from '@/components/BreadCrumb'
import Messages from '@/components/Messages'
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
  VAlert,
  VMenu,
  VDatePicker,
  VSelect,
  VAutocomplete,
  VDivider,
  VStepper,
  VDialog,
  VDataTable,
  VBadge,
  VResponsive,
  VCombobox,
  VTextarea,
  VImg,
  VExpansionPanel,
  VCarousel,
  transitions
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.component('app-header', Header)
Vue.component('app-footer', Footer)
Vue.component('app-breadcrumb', BreadCrumb)
Vue.component('app-feedback', Messages)
Vue.component('v-chart', ECharts)
// Vue.component('lingallery', Lingallery)

Vue.prototype.$http = Axios
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.use(Bars)
Vue.use(VueCarousel)
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
    VAlert,
    VMenu,
    VDatePicker,
    VSelect,
    VAutocomplete,
    VDivider,
    VStepper,
    VDialog,
    VDataTable,
    VBadge,
    VResponsive,
    VCombobox,
    VTextarea,
    VImg,
    VExpansionPanel,
    VCarousel,
    transitions
  },
  theme: {
    /* primary: '#ee44aa', */
    primary: '#E91E63',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.config.productionTip = false

sync(store, router)

/* eslint-disable no-new */
new Vue({
  iconfont: 'fa',
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
