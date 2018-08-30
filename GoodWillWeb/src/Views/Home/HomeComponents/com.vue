<template>
  <v-container class="my-5">
    <v-layout row wrap>
      <v-flex xs6>
        <h2 class="mb-4 primary--text">Commercials</h2>
      </v-flex>
      <v-flex xs6 text-xs-right>
        <router-link :to="'/'" exact>View more ...</router-link>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex px-1 xs12 md3 text-xs-center v-for="service in services" :key="service.Service_Id">
        <v-card height="100%" color="blue-grey darken-2">
          <v-container fluid grid-list-lg class="pa-1">
            <v-layout row>
              <!-- <v-flex xs4>
                <v-card-media
                  src="/static/img/images/pexels-photo-209315.jpeg"
                  height="125px"
                  contain
                ></v-card-media>
              </v-flex> -->
              <v-flex pa-1 xs12 sm4 md3>
                <v-card-title primary-title>
                  <div>{{ service.serviceTitle }}</div>
                </v-card-title>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        fixed: false,
        companyBrand: 'GoodWill',
        services: [
          {
            'Service_Id': '1',
            'link': '#',
            'serviceTitle': 'Rent'
          },
          {
            'Service_Id': '2',
            'link': '#',
            'serviceTitle': 'Sale/Buy'
          },
          {
            'Service_Id': '3',
            'link': '#',
            'serviceTitle': 'New Developments'
          },
          {
            'Service_Id': '4',
            'link': '#',
            'serviceTitle': 'Commercials'
          }
        ]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
