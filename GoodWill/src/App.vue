<template>
  <v-app id="app">
    <v-content>
      <v-container class="container" fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      companyBrand: 'GoodWill',
      swiperType: 'Easy Vertical Swiper'
    }
  },
  name: 'App',
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
        }
        throw err
      })
    })
  }
}
</script>

<style>
  /* @import url('https://fonts.googleapis.com/css?family=Montserrat|Open+Sans'); */
  /* @font-face {
      font-family: Montserrat;
      src: url('../src/assets/fonts/Montserrat/Montserrat-Medium.ttf');
  } */
  @font-face {
      font-family: Montserrat;
      src: url('../src/assets/fonts/Montserrat/Montserrat-Medium.ttf');
  }
  /* @font-face {
      font-family: Lato;
      src: url('../src/assets/fonts/Lato/Lato-Regular.ttf');
  }
  /* @font-face {
      font-family: Muli;
      src: url('../src/assets/fonts/Muli/Muli-Regular.ttf');
  } */

  #app{
    font-family: 'Montserrat', sans-serif;
    /* font-family: 'Montserrat', sans-serif;
    font-family: 'Muli', sans-serif;
    font-family: 'Lato', sans-serif;*/
    /* margin: 0; */
    /* display: flex;
    align-items: center;
    flex-direction: column; */
  }
  .container {
    padding: 0!important
  }
  a {
    text-decoration: none;
  }
</style>
