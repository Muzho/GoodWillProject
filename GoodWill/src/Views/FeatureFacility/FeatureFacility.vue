<template>
  <div class="mainDiv">
    <app-header></app-header>
    <v-container>
      <v-slide-y-transition mode="out-in">
        <v-layout row wrap>
          <v-flex xs12>
            <h1 class="primary--text mt-5 ml-2">{{page_title}}</h1>
            <app-breadcrumb v-bind:items="pages"></app-breadcrumb>
          </v-flex>
        </v-layout>
      </v-slide-y-transition>
      <v-layout row wrap mt-4>
        <v-flex xs12 md12>
          <v-tabs icons-and-text grow centered dark color="secondary">
            <v-tabs-slider color="primary"></v-tabs-slider>
            <v-tab class="tabTitle" href="#features">
              <v-badge left>
                <span slot="badge">{{ features.length }}</span>
                <span>Features</span>
              </v-badge>
            </v-tab>
            <v-tab class="tabTitle" href="#facility">
              <v-badge right>
                <span slot="badge">{{ facilities.length }}</span>
                <span class="badgeTitle">Facilities</span>
              </v-badge>
            </v-tab>

            <v-tab-item id="features">
              <Features></Features>
            </v-tab-item>
            <v-tab-item id="facility">
              <Facility></Facility>
            </v-tab-item>
          </v-tabs>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import Features from './ViewComponents/FeaturesComponent/FeaturesComponent'
  import Facility from './ViewComponents/FacilityComponent/FacilityComponent'
  import FeatureFacilityService from '@/Services/FeatureFacilityService'

  export default {
    components: {
      'Features': Features,
      'Facility': Facility
    },
    data () {
      return {
        page_title: 'Property Features and Facilities',
        pages: [
          {
            text: 'Home',
            pageUrl: '/Dashboard',
            disabled: false
          },
          {
            text: 'Facilities and Features',
            pageUrl: '/FeatureFacility',
            disabled: true
          }
        ],
        features: [],
        facilities: []
      }
    },
    created () {
      this.Facilities()
      this.Features()
    },
    mounted () {
      this.Facilities()
      this.Features()
    },
    methods: {
      async Features () {
        const response = await FeatureFacilityService.Features()
        this.features = response.data.features
      },
      async Facilities () {
        const response = await FeatureFacilityService.Facilities()
        this.facilities = response.data.facilities
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  .tabTitle {
    text-transform: capitalize;
    font-size: 120%;
  }
</style>
