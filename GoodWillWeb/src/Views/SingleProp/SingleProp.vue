<template>
  <div class="singleProp">
    <PropJumbotron></PropJumbotron>
    <v-container mt-3 mb-5 grid-list-md>
      <app-breadcrumb v-bind:items="pages"></app-breadcrumb>
      <v-layout row wrap>
        <v-flex xs12 sm7 md8>
          <PropDesc :propDesc="propDesc"></PropDesc>
          <hr class="mx-1 my-3">
          <PropFeatures :propFeatures="propFeatures"></PropFeatures>
          <hr class="mx-1 my-3">
          <PropNei :propNei="propNei"></PropNei>
        </v-flex>
        <v-flex xs12 sm5 md4>
          <PropViews :propViews="propViews"></PropViews>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import PropJumbotron from './SinglePropComponents/PropJumbotron'
  import PropDesc from './SinglePropComponents/PropDesc'
  import PropFeatures from './SinglePropComponents/PropFeatures'
  import PropNei from './SinglePropComponents/PropNei'
  import PropViews from './SinglePropComponents/PropViews'
  export default {
    components: {
      'PropJumbotron': PropJumbotron,
      'PropDesc': PropDesc,
      'PropFeatures': PropFeatures,
      'PropNei': PropNei,
      'PropViews': PropViews
    },
    data () {
      return {
        propID: this.$route.params.propID,
        pages: [
          {
            text: 'Home',
            pageUrl: '/',
            disabled: false
          },
          {
            text: 'Region',
            pageUrl: '/',
            disabled: false
          },
          {
            text: 'City',
            pageUrl: '/',
            disabled: false
          },
          {
            text: 'Area',
            pageUrl: '/',
            disabled: false
          },
          {
            text: 'Property',
            pageUrl: '',
            disabled: true
          }
        ],
        propFeatures: [],
        propDesc: [],
        propNei: [],
        propViews: []
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
