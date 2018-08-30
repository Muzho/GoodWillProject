<template>
  <v-toolbar flat app>
    <v-toolbar-title>
      <router-link v-text="companyBrand" :to="'/'" exact></router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat class="headerLinks">Buy</v-btn>
      <v-btn flat>Rent</v-btn>
      <v-btn flat>Developments</v-btn>
      <v-btn flat>Become an Agent</v-btn>
      <v-btn flat v-if="userAuth">Sign Out</v-btn>
      <v-btn flat class="headerLinks" v-else :to="'/Accounts'">Sign In / Register</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  export default {
    data () {
      return {
        fixed: true,
        companyBrand: 'GoodWill',
        userAuth: false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  button, .headerLinks {
    text-transform: capitalize;
  }
</style>
