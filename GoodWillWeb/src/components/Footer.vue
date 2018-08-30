<template>
  <v-footer :fixed="fixed" height="auto" color="secondary">
    <v-layout row wrap>
      <v-flex xs12 md6 py-3 text-xs-center dark--text>
        <span>Copyright &copy; {{ new Date().getFullYear() }} {{ companyBrand }} is a registered trade mark.</span>
      </v-flex>
      <v-flex xs12 md6 py-3 text-xs-center white--text>
        <span
        v-for="footerLink in footerLinks"
        class="px-2"><a href="#">{{ footerLink.linkTitle }}</a></span>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
  export default {
    data () {
      return {
        fixed: false,
        companyBrand: 'GoodWill',
        footerLinks: [
          {
            'link': '#',
            'linkTitle': 'Privacy Policy'
          },
          {
            'link': '#',
            'linkTitle': 'Terms & Conditions'
          }
        ]
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
