<template>
  <v-jumbotron
    :gradient="gradient"
    dark
    class="jumbotron"
    height="550px"
    src="/static/img/images/pexels-photo-1080722.jpeg"
  >
  <!--  -->
    <v-container fill-height>
      <v-layout align-center>
        <v-flex text-xs-center>
          <h1>Your Finest Property Masters</h1>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script>
  export default {
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
