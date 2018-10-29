<template>
  <v-footer :fixed="fixed" height="auto">
    <v-layout row wrap>
      <v-flex xs12 py-3 text-xs-center primary--text>
        <span>Copyright &copy; {{ new Date().getFullYear() }} {{ companyBrand }}</span>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
  export default {
    data () {
      return {
        fixed: false,
        companyBrand: 'GoodWill'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a {
    text-decoration: none;
  }
</style>
