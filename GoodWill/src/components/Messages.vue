<template>
  <div class="mainDiv">

  </div>
</template>

<script>
  export default {
    props: {
      message: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        messageDialog: false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  .errorMessage {
    color: red;
  }
</style>
