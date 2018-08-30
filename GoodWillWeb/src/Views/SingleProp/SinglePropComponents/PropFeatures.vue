<template>
  <v-container my-2>
    <v-layout row wrap>
      <v-flex xs12>
        <h2 class="mb-4">Property Features</h2>
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
