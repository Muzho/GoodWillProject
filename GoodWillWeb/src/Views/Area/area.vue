<template>
  <v-container fluid>
    <v-layout px-2>
      <v-container mt-2 mb-5>
        <app-breadcrumb v-bind:items="pages"></app-breadcrumb>
        <h2 class="my-4">
          {{ properties.length }} results of {{ areatype }} for {{ areacategory }} in {{ area }}
        </h2>
        <v-layout row wrap>
          <v-flex xs12 class="my-3">
            control panel and pagination
          </v-flex>
          <v-flex px-1 py-2 xs12 sm4 md3 v-for="property in properties" :key="property.prop_id">
            <v-card flat class="propertyCards" height="100%"
            v-bind:to="{path: '/SingleProp/' + property.prop_id}" exact>
              <v-card-media
                :src="property.img"
                height="200px"
              ></v-card-media>
              <v-card-text class="pb-0 pt-2">
                {{ property.type }} . {{ property.location }}
              </v-card-text>
              <v-card-title class="py-0" primary-title>
                <h3>{{ property.title }}</h3>
              </v-card-title>
              <v-card-text class="pb-3 pt-0">
                Ugx. {{ property.price }}
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
  import localityService from '@/Services/Locality/locality'
  export default {
    data () {
      return {
        area: this.$route.query.area,
        areaID: this.$route.params.areaID,
        type: this.$route.query.type,
        category: this.$route.query.category,
        city: this.$route.query.city,
        region: this.$route.query.region,
        areatype: '',
        areacategory: '',
        pages: [
          {
            text: 'Home',
            pageUrl: '/',
            disabled: false
          },
          {
            text: 'Region',
            pageUrl: '',
            disabled: false
          },
          {
            text: 'City',
            pageUrl: '',
            disabled: false
          },
          {
            text: 'area',
            pageUrl: '',
            disabled: true
          }
        ],
        properties: []
      }
    },
    created () {
      this.areaProperties()
      this.breadCrumbModifier()
    },
    mounted () {
      this.areaProperties()
      // this.breadCrumbModifier()
    },
    methods: {
      async areaProperties () {
        try {
          const response = await localityService.areaProperties({
            area: this.areaID,
            category: this.category,
            type: this.type
          })
          if (response) {
            // console.log(response)
            if (response.data.success === true) {
              this.properties = response.data.properties
              this.areatype = response.data.properties[0].type
              this.areacategory = response.data.properties[0].category
              // this.breadCrumber(response.data.locDetails)
            } else if (response.data.success === false) {
              console.log(response.data.error)
            }
          }
        } catch (error) {
          console.log(error)
        }
      },
      breadCrumbModifier () {
        // area
        this.pages[3].text = this.area
        // city
        this.pages[2].text = 'City: ' + this.city[0]
        this.pages[2].pageUrl = {path: '/City/' + this.city[1], query: {city: this.city[0], region: this.region, category: this.category, type: this.type}}
        // region
        this.pages[1].text = 'Region: ' + this.region[0]
        this.pages[1].pageUrl = {path: '/Region/' + this.region[1], query: {category: this.category, type: this.type}}
      },
      breadCrumber (locDetails) {
        this.pages[3].text = locDetails.area
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
