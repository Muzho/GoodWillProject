<template>
  <v-container fluid>
    <!-- <Jumbotron></Jumbotron> -->
    <v-layout px-2>
      <v-container mt-2 mb-5>
        <app-breadcrumb v-bind:items="pages"></app-breadcrumb>
        <h1>{{ titStatement }}</h1>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
  import localityService from '@/Services/Locality/locality'
  export default {
    data () {
      return {
        regionID: this.$route.params.regionID,
        type: this.$route.query.type,
        category: this.$route.query.category,
        region: this.$route.query.region,
        titStatement: '',
        pages: [
          {
            text: 'Home',
            pageUrl: '/',
            disabled: false
          },
          {
            text: 'Region',
            pageUrl: '',
            disabled: true
          }
        ],
        properties: []
      }
    },
    created () {
      this.regionProperties()
      this.breadCrumbModifier()
      // this.titleStatement()
    },
    mounted () {
      this.regionProperties()
      this.breadCrumbModifier()
      this.titleStatement()
      console.log(this.properties.length)
    },
    methods: {
      async regionProperties () {
        const regionCitiesResponse = await localityService.regionProperties({
          region: this.regionID
        })

        if (regionCitiesResponse.data.success === true) {
          let cities = regionCitiesResponse.data.cities
          let areas = []
          for (let a = 0; a < cities.length; a++) {
            const cityAreasResponse = await localityService.cityProperties({
              city: cities[a],
              category: this.category,
              type: this.type
            })
            if (cityAreasResponse.data.success === true) {
              for (let b = 0; b < cityAreasResponse.data.areas.length; b++) {
                areas.push(cityAreasResponse.data.areas[b])
              }
            } else if (cityAreasResponse.data.success === false) {
              console.log(cityAreasResponse.data.error)
            }
          }
          for (let i = 0; i < areas.length; i++) {
            const response = await localityService.areaProperties({
              area: areas[i],
              category: this.category,
              type: this.type
            })
            if (response) {
              if (response.data.success === true) {
                this.populateProperties(response.data.properties)
              } else if (response.data.success === false) {
                console.log(response.data.error)
              }
            }
          }
        } else if (regionCitiesResponse.data.success === false) {
          console.log(regionCitiesResponse.data.error)
        }
      },
      populateProperties (properties) {
        // console.log(properties)
        for (let a = 0; a < properties.length; a++) {
          this.properties.push(properties[a])
        }
      },
      titleStatement () {
        // console.log(this.properties.length)
        /* if (this.properties.length > 0) {
          this.titStatement = this.properties.length + ' results of ' + this.properties[0].category + ' for ' + this.properties[0].type + ' in ' + this.region
        } */
        this.titStatement = this.properties.length + ' results '
      },
      breadCrumbModifier () {
        // region
        this.pages[1].text = this.region
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
