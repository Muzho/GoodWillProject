<template>
  <v-container class="my-5">
    <v-layout row wrap>
      <v-flex xs12>
        <h2 class="mb-4 primary--text">Developments</h2>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex px-1 xs12 md3 text-xs-center v-for="service in services" :key="service.Service_Id">
        <v-card height="100%" :color="service.color">
          <v-container fluid grid-list-lg>
            <v-layout row wrap class="pa-3">
              <v-flex xs6 sm4 md3>
                <v-icon color="white">{{service.icon}}</v-icon>
              </v-flex>
              <v-flex xs6 sm8 md9>
                <v-card-title primary-title class="pt-0 white--text">
                  {{ service.serviceTitle }}
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
            'serviceTitle': 'Property Rentals',
            'icon': 'location_city',
            'color': 'teal'
          },
          {
            'Service_Id': '2',
            'link': '#',
            'serviceTitle': 'Property Sale',
            'icon': 'store',
            'color': 'orange'
          },
          {
            'Service_Id': '3',
            'link': '#',
            'serviceTitle': 'New Developments',
            'icon': 'domain',
            'color': 'red'
          },
          {
            'Service_Id': '4',
            'link': '#',
            'serviceTitle': 'Car Rentals',
            'icon': 'time_to_leave',
            'color': 'yellow'
          }
        ]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
