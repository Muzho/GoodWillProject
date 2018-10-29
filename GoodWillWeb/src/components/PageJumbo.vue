<template>
  <v-jumbotron
    :gradient="gradient"
    dark
    class="jumbotron"
    height="400px"
    :src="Jumbo.img"
  >
    <v-container fill-height>
      <v-layout align-center>
        <v-flex text-xs-center>
          <h1>{{ Jumbo.text }}</h1>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script>
  export default {
    props: {
      Jumbo: {
        type: Object,
        required: true
      }
    },
    data: () => ({
      gradient: 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)'
    })
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .jumbotron img {
     height: 100%;
  }
</style>
