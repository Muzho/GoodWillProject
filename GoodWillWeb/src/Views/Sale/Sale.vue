<template>
  <v-container fluid>
    <PageJumbo :Jumbo="Jumbo"></PageJumbo>
    <v-layout px-2>
      <v-container mt-2 mb-5>
        <app-breadcrumb v-bind:items="pages"></app-breadcrumb>
        For Sale
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
  import PageJumbo from '@/components/PageJumbo'
  export default {
    components: {
      'PageJumbo': PageJumbo
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
            text: 'For Sale',
            pageUrl: '',
            disabled: true
          }
        ],
        Jumbo: {
          img: '/static/img/Images/pexels-photo-1080722.jpeg',
          text: 'For Sale'
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
