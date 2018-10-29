<template>
  <div class="mainDiv">
    <app-header></app-header>
    <v-container>
      <v-slide-y-transition mode="out-in">
        <v-layout row wrap>
          <v-flex xs12 md6 text-xs-left>
            <h1 class="primary--text mt-5">Dashboard</h1>
            <app-breadcrumb v-bind:items="pages"></app-breadcrumb>
          </v-flex>
        </v-layout>
      </v-slide-y-transition>
    </v-container>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        pages: [
          {
            text: 'Home',
            pageUrl: '/',
            disabled: true
          }
        ]
      }
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  .errorMessage {
    color: red;
  }
</style>
