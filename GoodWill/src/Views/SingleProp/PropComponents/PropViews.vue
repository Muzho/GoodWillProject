<template>
  <v-container my-2>
    <v-layout row wrap>
      <v-flex xs12>
        <h4 class="mt-4 grey--text">Property Views</h4>
      </v-flex>
      <v-flex xs12>
        <p>{{ propViews }}</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: {
      propViews: {
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
