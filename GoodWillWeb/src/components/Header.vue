<template>
  <v-container fluid>
    <v-toolbar app>
      <v-toolbar-title v-text="companyBrand"></v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="hidden-sm-and-down ml-3 mr-3">Sign In</span>
      <span class="hidden-sm-and-down mr-3">About Us</span>
    </v-toolbar>
  </v-container>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
