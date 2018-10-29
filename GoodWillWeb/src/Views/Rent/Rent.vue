<template>
  <v-container fluid>
    <Jumbotron></Jumbotron>
    <v-layout px-2>
      <v-container mt-2 mb-5>
        <app-breadcrumb v-bind:items="pages"></app-breadcrumb>
        Rentals
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
  import Jumbotron from '@/components/Jumbotron'
  export default {
    components: {
      'Jumbotron': Jumbotron
    },
    data () {
      return {
        pages: [
          {
            text: 'Home',
            pageUrl: '/',
            disabled: false
          },
          {
            text: 'For Rent',
            pageUrl: '',
            disabled: true
          }
        ]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
