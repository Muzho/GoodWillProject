<template>
  <v-container my-2>
    <v-layout row wrap>
      <v-flex xs12 sm12>
        <h3 class="mt-4 grey--text">Property Description</h3>
      </v-flex>
      <v-flex xs12>
        <p>{{ propDesc }}</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['propDesc'],
    data () {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .propBtn {
    text-transform: capitalize;
  }
</style>
