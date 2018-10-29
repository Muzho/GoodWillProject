<template>
  <div class="mainDiv">
    <app-header></app-header>
    <v-container>
      <v-slide-y-transition mode="out-in">
        <v-layout row wrap>
          <v-flex xs12 md12>
            <h1 class="primary--text mt-5 ml-2">{{page_title}}</h1>
            <app-breadcrumb v-bind:items="pages"></app-breadcrumb>
          </v-flex>
          <v-flex xs12 md12>
            <v-tabs icons-and-text grow centered dark color="secondary">
              <v-tabs-slider color="primary"></v-tabs-slider>
              <v-tab class="tabTitle" href="#area">
                Areas
                <v-icon>pin_drop</v-icon>
              </v-tab>
              <v-tab class="tabTitle" href="#city">
                Cities
                <v-icon>near_me</v-icon>
              </v-tab>
              <v-tab class="tabTitle" href="#region">
                Regions
                <v-icon>my_location</v-icon>
              </v-tab>
              <v-tab class="tabTitle" href="#country">
                Countries
                <v-icon>map</v-icon>
              </v-tab>

              <v-tab-item id="country">
                <country></country>
              </v-tab-item>
              <v-tab-item id="region">
                <regions></regions>
              </v-tab-item>
              <v-tab-item id="city">
                <cities></cities>
              </v-tab-item>
              <v-tab-item id="area">
                <areas></areas>
              </v-tab-item>
            </v-tabs>
          </v-flex>
        </v-layout>
      </v-slide-y-transition>
    </v-container>
  </div>
</template>

<script>
  import country from './LocalityComps/Country/Country'
  import areas from './LocalityComps/Areas/Areas'
  import regions from './LocalityComps/Regions/Regions'
  import cities from './LocalityComps/Cities/Cities'
  export default {
    components: {
      'country': country,
      'areas': areas,
      'regions': regions,
      'cities': cities
    },
    data () {
      return {
        page_title: 'Localities',
        pages: [
          {
            text: 'Home',
            pageUrl: '/Dashboard',
            disabled: false
          },
          {
            text: 'Locality',
            pageUrl: '/Locality',
            disabled: true
          }
        ]
      }
    },
    methods: {}
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
  .tabTitle {
    text-transform: capitalize;
  }
</style>
