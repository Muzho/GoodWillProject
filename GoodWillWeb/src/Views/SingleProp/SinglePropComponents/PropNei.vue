<template>
  <v-container my-2>
    <v-layout row wrap>
      <v-flex xs12>
        <h2 class="mb-4 grey--text">The neighborhood</h2>
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
