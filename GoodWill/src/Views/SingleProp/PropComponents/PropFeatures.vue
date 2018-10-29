<template>
  <v-container my-2>
    <v-layout row wrap>
      <v-flex xs12>
        <h4 class="mt-4 grey--text">Property Features and Facilities</h4>
      </v-flex>
      <v-flex xs12 v-if="propFeatures.length > 0">
        <p>{{ propFeatures }}</p>
      </v-flex>
      <v-flex xs12 v-else>
        <p>Property has no features or facilities</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: {
      propFeatures: {
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
