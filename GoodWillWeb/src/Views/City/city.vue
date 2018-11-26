<template>
  <v-container fluid>
    <v-layout px-2>
      <v-container mt-2 mb-5>
        <app-breadcrumb v-bind:items="pages"></app-breadcrumb>
        <h2 class="my-4">
          {{ titStatement }}
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
        cityID: this.$route.params.cityID,
        type: this.$route.query.type,
        category: this.$route.query.category,
        city: this.$route.query.city,
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
            disabled: false
          },
          {
            text: '',
            pageUrl: '',
            disabled: true
          }
        ],
        properties: []
      }
    },
    created () {
      this.cityProperties()
      this.breadCrumbModifier()
    },
    methods: {
      async cityProperties () {
        try {
          const response = await localityService.cityProperties({
            city: this.cityID,
            category: this.category,
            type: this.type
          })
          if (response) {
            if (response.data.success === true) {
              let propResponse = response.data.areas
              // console.log(propResponse)
              for (let i = 0; i < propResponse.length; i++) {
                const responseProperty = await localityService.areaProperties({
                  area: propResponse[i],
                  category: this.category,
                  type: this.type
                })

                if (responseProperty.data.success === true) {
                  this.populateProperties(responseProperty.data.properties)
                } else if (responseProperty.data.success === false) {
                  console.log(responseProperty.data.error)
                }
              }
              this.titleStatement()
            } else if (response.data.success === false) {
              console.log(response.data.error)
            }
          } else {
            console.log('No response from server')
          }
        } catch (error) {
          console.log(error)
        }
      },
      populateProperties (properties) {
        // console.log(properties)
        for (let a = 0; a < properties.length; a++) {
          this.properties.push(properties[a])
        }
      },
      titleStatement () {
        if (this.properties.length > 0) {
          this.titStatement = this.properties.length + ' results of ' + this.properties[0].category + ' for ' + this.properties[0].type + ' in ' + this.city
        }
      },
      breadCrumbModifier () {
        // city
        this.pages[2].text = this.city
        // region
        this.pages[1].text = 'Region: ' + this.region[0]
        this.pages[1].pageUrl = {path: '/Region/' + this.region[1], query: {region: this.region[0], category: this.category, type: this.type}}
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
