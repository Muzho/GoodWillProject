<template>
  <div class="singleProp">
    <app-header></app-header>
    <PropJumbotron :img="img"></PropJumbotron>
    <v-container mt-3 mb-5 grid-list-md>
      <app-breadcrumb v-bind:items="pages"></app-breadcrumb>
      <v-layout row wrap>
        <v-flex xs12 sm7 md8>
          <h2>{{ title }}</h2>
          <PropDesc :propDesc="propDesc"></PropDesc>
          <hr class="mx-1 my-3">
          <PropFeatures :propFeatures="propFeatures"></PropFeatures>
          <hr class="mx-1 my-3">
          <PropNei :propNei="propNei"></PropNei>
        </v-flex>
        <v-flex xs12 sm5 md4>
          <PropViews :propViews="propViews"></PropViews>
          views
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import singlePropService from '@/Services/singleProp'
  import PropJumbotron from './PropComponents/PropJumbotron'
  import PropDesc from './PropComponents/PropDesc'
  import PropFeatures from './PropComponents/PropFeatures'
  import PropNei from './PropComponents/PropNei'
  import PropViews from './PropComponents/PropViews'
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
            pageUrl: '/Dashboard',
            disabled: false
          },
          {
            text: 'GoodWill Properties',
            pageUrl: '/Land',
            disabled: false
          },
          {
            text: 'Single Property',
            pageUrl: '/SingleProp/:this.propID',
            disabled: false
          }
        ],
        img: '',
        title: null,
        propFeatures: [],
        propDesc: '',
        propNei: [],
        propViews: []
      }
    },
    created () {
      this.property()
    },
    mounted () {
      this.property()
    },
    methods: {
      async property () {
        try {
          const response = await singlePropService.property({
            propID: this.propID
          })

          if (response.data.success === true) {
            this.propSep(response.data.property)
          } else if (response.data.success === false) {
            console.log(response.data.error)
          }
        } catch (error) {
          console.log(error)
        }
      },
      propSep (property) {
        this.img = property.img
        this.title = property.title
        this.propDesc = property.details
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
