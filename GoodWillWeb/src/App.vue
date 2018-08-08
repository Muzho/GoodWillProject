<template>
  <v-app id="app">
    <app-header></app-header>
    <v-content class="mt-2">
      <!-- <router-view/> -->
      <router-view></router-view>
    </v-content>
    <v-footer :fixed="fixed" app class="footer">
      <span>&copy; {{ new Date().getFullYear() }} {{ companyBrand }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      fixed: true,
      companyBrand: 'GoodWill'
    }
  },
  name: 'App'
}
</script>

<style>
  /* @import url('https://fonts.googleapis.com/css?family=Montserrat|Open+Sans'); */
  /* @font-face {
      font-family: Montserrat;
      src: url('../src/assets/fonts/Montserrat/Montserrat-Medium.ttf');
  }
  @font-face {
      font-family: Montserrat;
      src: url('../src/assets/fonts/Montserrat/Montserrat-Medium.ttf');
  } */
  @font-face {
      font-family: Lato;
      src: url('../src/assets/fonts/Lato/Lato-Regular.ttf');
  }

  #app{
    /* font-family: 'Montserrat', sans-serif;
    font-family: 'Montserrat', sans-serif; */
    font-family: 'Lato', sans-serif;
    /* margin: 0; */
  }
  .footer {
  	margin-bottom: 0%;
  	padding: 2%;
  }
</style>
