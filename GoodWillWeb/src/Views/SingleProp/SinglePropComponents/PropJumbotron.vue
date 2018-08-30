<template>
  <v-jumbotron
    :gradient="gradient"
    dark
    class="jumbotron"
    height="350px"
    src="/static/img/images/pexels-photo-1080722.jpeg"
  >
    <v-container fluid fill-height>
      <v-layout px-4 row wrap>
        <v-flex pt-5 sm6 text-xs-left>
          <v-btn outline color="primary">
            <v-icon left>collections</v-icon>
            View Photos
          </v-btn>
        </v-flex>
        <v-flex pt-5 sm6 text-xs-right>
          <v-btn outline color="primary">
            <v-icon left>share</v-icon>
            Share
          </v-btn>
          <v-btn depressed>
            <v-icon left>favorite_border</v-icon>
            Save
          </v-btn>
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
  button {
    text-transform: capitalize;
  }
</style>
