<template>
  <bars
    :data="[{value: 0, title: 'Apartments'}, {value: 1, title: 'test1'}, {value: 5, title: 'test5'}, {value: 2, title: 'test2'}, {value: 1, title: 'test1'}]"
    :width="200" :height="200"
    :gradient="['#6fa8dc', '#42b983']" :barWidth="5" :growDuration="1">
  </bars>
</template>
<script>
  export default {
    data () {
      return {}
    }
  }
</script>
