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
      <v-layout pa-5 align-center>
        <v-flex pa-5 xs12>
          <h1>Your Finest Property Masters</h1>
          <v-text-field
            v-model="search"
            solo-inverted
            round
            box
            clearable value="try Ibiza"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script>
  export default {
    data: () => ({
      gradient: 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)',
      search: '',
      location: 'Mbarara'
    })
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .jumbotron img {
     height: 100%;
  }
</style>
