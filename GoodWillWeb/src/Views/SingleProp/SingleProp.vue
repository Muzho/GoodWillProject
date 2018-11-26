<template>
  <div class="singleProp">
    <app-header></app-header>
    <PropJumbotron :prop_id="propID"></PropJumbotron>
    <v-container mt-3 mb-5 grid-list-md>
      <app-breadcrumb v-bind:items="pages"></app-breadcrumb>
      <v-layout row wrap pa-3>
        <v-flex xs12 sm8 md8 class="pa-2">
          <v-layout row wrap>
            <v-flex xs12>
              <h2>{{ property.title }}</h2>
            </v-flex>
          </v-layout>
          <p>
            <v-icon>place</v-icon>
            <span class="ml-1">{{ property.address}}, {{ property.location }}</span>
          </p>
          <p class="mt-0">
            <span :class="property.category">For {{ property.category }}</span>
          </p>
          <p class="mt-0">
            <span :class="property.type">{{ property.type }}</span>
          </p>
          <p class="mt-0 mb-4">
            <span>Ugx. {{ property.price }}</span>
          </p>
          <PropDesc :propDesc="property.details"></PropDesc>
          <hr class="mx-1 my-3">
          <PropFeatures :prop_id="propID"></PropFeatures>
          <!-- <hr class="mx-1 my-3">
          <PropNei :propNei="propNei"></PropNei> -->
        </v-flex>
        <v-flex xs12 sm4 md4>
          <PropViews></PropViews>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import singlePropService from '@/Services/singleProperty/singleProperty'
  import PropJumbotron from './singlePropComponents/PropJumbotron'
  import PropDesc from './singlePropComponents/PropDesc'
  import PropFeatures from './singlePropComponents/PropFeatures'
  import PropNei from './singlePropComponents/PropNei'
  import PropViews from './singlePropComponents/PropViews'
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
            pageUrl: '/Home',
            disabled: false
          },
          {
            text: 'Region: ',
            pageUrl: '',
            disabled: false
          },
          {
            text: 'City: ',
            pageUrl: '',
            disabled: false
          },
          {
            text: 'Area: ',
            pageUrl: '',
            disabled: false
          },
          {
            text: '',
            pageUrl: '',
            disabled: true
          }
        ],
        propNei: [],
        property: {},
        locDetails: {}
      }
    },
    created () {
      this.singleProperty()
    },
    mounted () {
      this.singleProperty()
    },
    methods: {
      async singleProperty () {
        try {
          const response = await singlePropService.property({
            propID: this.propID
          })

          if (response.data.success === true) {
            this.property = response.data.property
            this.breadCrumbModifier(response.data.locDetails)
          } else if (response.data.success === false) {
            console.log(response.data.error)
          }
        } catch (error) {
          console.log(error)
        }
      },
      breadCrumbModifier (locInfo) {
        // property
        this.pages[4].text = locInfo.property
        // area
        this.pages[3].text = 'Area: ' + locInfo.area
        this.pages[3].pageUrl = {path: '/Area/' + locInfo.areaID, query: {area: locInfo.area, city: [locInfo.city, locInfo.cityID], region: [locInfo.region, locInfo.regionID], category: locInfo.category, type: locInfo.type}}
        // city
        this.pages[2].text = 'City: ' + locInfo.city
        this.pages[2].pageUrl = {path: '/City/' + locInfo.cityID, query: {city: locInfo.city, region: [locInfo.region, locInfo.regionID], category: locInfo.category, type: locInfo.type}}
        // region
        this.pages[1].text = 'Region: ' + locInfo.region
        this.pages[1].pageUrl = {path: '/Region/' + locInfo.regionID, query: {category: locInfo.category, type: locInfo.type}}
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .Sale {
    color: #FF5722;
  }
  .Rent {
    color: #0091EA;
  }
  .NewDevelopment {
    color: #00BFA5;
  }
</style>
