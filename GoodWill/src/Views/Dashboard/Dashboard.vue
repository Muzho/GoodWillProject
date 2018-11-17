<template>
  <div class="mainDiv">
    <app-header></app-header>
    <v-container>
      <v-slide-y-transition mode="out-in">
        <v-layout row wrap>
          <v-flex xs12 md6 text-xs-left>
            <h1 class="primary--text mt-5 ml-1">Dashboard</h1>
            <app-breadcrumb v-bind:items="pages"></app-breadcrumb>
          </v-flex>
        </v-layout>
      </v-slide-y-transition>
      <statsTiles :properties="properties"
        :types="propTypes"
        :categories="propCategories"
        :features="features"
        :facilities="facilities"
        :femaleUsers="femaleUsers"
        :maleUsers="maleUsers"
        :lands="lands"
        :spacetolet="spacetolet"
        :warehouses="warehouses"
        :offices="offices"
        :cars="cars" :owners="owners" :users="users"></statsTiles>

        <v-layout row wrap>
          <v-flex xs12 md8>
          bsdjf
          </v-flex>
          <v-flex xs4>don't yah</v-flex>
        </v-layout>
    </v-container>
  </div>
</template>

<script>
  import statsTiles from './dashboardComponents/statsTiles'
  import LandService from '@/Services/LandService'
  import WhenNeededService from '@/Services/WhenNeededService'
  export default {
    components: {
      'statsTiles': statsTiles
    },
    data () {
      return {
        pages: [
          {
            text: 'Dashboard',
            pageUrl: '/',
            disabled: true
          }
        ],
        properties: 0,
        rent: 0,
        sale: 0,
        apartments: 0,
        lands: 0,
        cars: 0,
        warehouses: 0,
        offices: 0,
        spacetolet: 0,
        houses: 0,
        features: 0,
        facilities: 0,
        owners: 0,
        users: 0,
        maleUsers: 0,
        femaleUsers: 0,
        propTypes: 0,
        propCategories: 0
      }
    },
    mounted () {
      this.PropertyCategories()
      this.PropertyTypes()
      this.Lands()
    },
    methods: {
      async PropertyCategories () {
        const response = await WhenNeededService.PropertyCategories()
        this.propCategories = response.data.property_categories.length
      },
      async PropertyTypes () {
        const response = await WhenNeededService.PropertyTypes()
        this.propTypes = response.data.property_types.length
      },
      async Lands () {
        const response = await LandService.properties()
        this.properties = response.data.lands.length
      }
    }
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
</style>
