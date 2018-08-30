<template>
  <v-container class="my-5" grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs10 offset-xs1>
        <v-tabs
          slot="extension"
          v-model="tab"
          color="primary"
          grow
        >
          <v-tabs-slider color="secondary"></v-tabs-slider>

          <v-tab class="turbo" href="#login">
            Sign In
          </v-tab>
          <v-tab class="turbo" href="#signup">
            Sign Up
          </v-tab>

          <v-tab-item id="login">
            <Login></Login>
          </v-tab-item>

          <v-tab-item id="signup">
            <v-card flat>
              <v-card-text>signup</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Login from './Login'
  // import Login from './Login'
  export default {
    components: {
      'Login': Login
    },
    data () {
      return {
        tab: null
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .turbo {
    text-transform: capitalize;
    font-size: 120%;
  }
</style>
