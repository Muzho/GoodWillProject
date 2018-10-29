<template>
  <v-container fluid>
    <Jumbotron></Jumbotron>
    <v-layout px-2>
      <v-container my-5>
        <pow v-bind:pows="pows"></pow>
        <pos v-bind:poss="pos"></pos>
        <por v-bind:pors="pors"></por>
        <!-- <newDev></newDev>
        <com></com> -->
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
  import Jumbotron from '@/components/Jumbotron'
  import newDev from './HomeComponents/newDev'
  import pow from './HomeComponents/pow'
  import pos from './HomeComponents/pos'
  import por from './HomeComponents/por'
  import com from './HomeComponents/com'
  import PropService from '@/Services/Home/HomeService'
  export default {
    components: {
      'Jumbotron': Jumbotron,
      'newDev': newDev,
      'pow': pow,
      'pos': pos,
      'por': por,
      'com': com
    },
    data () {
      return {
        pows: [],
        pors: [],
        pos: [],
        propa: []
      }
    },
    created () {
      this.properties()
    },
    mounted () {
      this.properties()
    },
    methods: {
      async properties () {
        const response = await PropService.properties()
        // this.statsCalculator(response.data.lands)
        let rentals = []
        let sales = []
        if (response) {
          if (response.data.success) {
            for (let i = 0; i < response.data.lands.length; i++) {
              if (response.data.lands[i].category === 'Rent') {
                rentals.push(response.data.lands[i])
              }
              if (response.data.lands[i].category === 'Sale') {
                sales.push(response.data.lands[i])
              }
            }
            this.pors = rentals
            this.pos = sales
          }
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
