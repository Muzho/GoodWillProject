<template>
  <v-container fluid>
    <Jumbotron></Jumbotron>
    <v-layout px-2>
      <v-container mt-5>
        <pow v-bind:pows="pows"></pow>
        <pos></pos>
        <por v-bind:pors="pows"></por>
        <newDev></newDev>
        <com></com>
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
        pows: [
          {
            'id': '1',
            'propImg': '/static/img/images/architecture-construction-daylight-534228.jpg',
            'propTitle': 'Pent house',
            'propArea': 'Nakulabye',
            'propCat': 'Sale',
            'amount': '120,000,000',
            'bedrooms': '5',
            'bathrooms': '3',
            'city': 'Kampala'
          },
          {
            'id': '2',
            'propImg': 'http://localhost:8080/static/img/Images/architecture-construction-daylight-534228.jpg',
            'propTitle': 'Bungalow',
            'propCat': 'Rent',
            'propArea': 'Muyonyo',
            'amount': '1,200,000',
            'bedrooms': '2',
            'bathrooms': '3',
            'city': 'Kampala'
          }
        ]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
