<template>
  <trend
    :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
    :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
    auto-draw
    smooth>
  </trend>
</template>
<script>
  export default {
    props: ['chartData', 'options']
  }
</script>
<style scoped></style>
