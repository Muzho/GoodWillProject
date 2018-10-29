<template>
  <v-container my-2>
    <v-layout row wrap>
      <v-flex xs12>
        <h4 class="mt-4 grey--text">Neighbouring Landmarks</h4>
      </v-flex>
      <v-flex xs12 v-if="propNei.length > 0">
        <p>{{ propNei }}</p>
      </v-flex>
      <v-flex xs12 v-else>
        <p class="nothingYet">No land marks around the property</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: {
      propNei: {
        type: Array,
        required: true
      }
    },
    data () {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
