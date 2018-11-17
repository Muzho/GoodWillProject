<template>
  <div class="movie">
    <div class="content">
      <h2 class="typeTitle">{{ title }}</h2>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String
      }
    },
    data () {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
      font-weight: normal;
    }
    .movie{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-end;
      text-align: left;
      padding: 10px;
      width : 200px;
      height : 100px;
      background-color: rgba(255,255,255,0.7);
      background-repeat: no-repeat;
      background-blend-mode: overlay;
      background-size: cover;
    }
</style>
