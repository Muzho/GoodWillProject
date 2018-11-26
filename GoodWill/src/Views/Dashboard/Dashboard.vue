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

        <v-layout row wrap my-4>
          <v-flex xs12 sm5 class="pa-1">
            <v-card height="100%">
              <v-card-title>
                <h3>Property Types</h3>
              </v-card-title>
              <v-card-text>
                <chartjs-bar :labels="barChart.labels"
                :datasets="barChart.datasets" :option="barChart.options"
                :bind="true"></chartjs-bar>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm4 class="pa-1">
            <v-card height="100%">
              <v-card-title>
                <h3>Property Categories</h3>
              </v-card-title>
              <v-card-text>
                <chartjs-bar :labels="catBarChart.labels"
                :datasets="catBarChart.datasets" :option="catBarChart.options"
                :bind="true"></chartjs-bar>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm3 class="pa-1">
            <v-card height="100%">
              <v-card-title>
                <h3>Property Views</h3>
              </v-card-title>
              <v-card-text>
                <!-- <trend
                  :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
                  :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
                  auto-draw
                  smooth>
                </trend> -->
                <chartjs-line :labels="lineChart.labels"
                :data="lineChart.dataset"
                :bind="true"></chartjs-line>
              </v-card-text>
            </v-card>
          </v-flex>
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
        lineChart: {
          dataset: [],
          labels: []
        },
        barChart: {
          datasets: [{
            data: [],
            label: 'GoodWill Property Types',
            backgroundColor: 'rgba(75,192,192,0.4)'
          }],
          labels: [],
          options: {
            maintainAspectRatio: true,
            responsive: true,
            scales: {
              yAxes: [{
                display: true,
                ticks: {
                  beginAtZero: true
                }
              }]
            },
            legend: {
              labels: {
                fontColor: 'black'
              }
            }
          }
        },
        catBarChart: {
          datasets: [{
            label: 'GoodWill Property Categories',
            data: []
          }],
          labels: [],
          options: {
            maintainAspectRatio: true,
            responsive: true,
            scales: {
              yAxes: [{
                display: true,
                ticks: {
                  beginAtZero: true
                }
              }]
            },
            legend: {
              labels: {
                fontColor: 'black'
              }
            }
          }
        },
        chartData: [],
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
        propCategories: 0,
        cats: [],
        typo: []
      }
    },
    mounted () {
      this.PropertyCategories()
      this.PropertyTypes()
      this.Lands()
    },
    created () {
      this.Lands()
    },
    methods: {
      async PropertyCategories () {
        const response = await WhenNeededService.PropertyCategories()
        this.calCat(response.data.property_categories)
      },
      calCat (categories) {
        this.propCategories = categories.length
        for (let i = 0; i < categories.length; i++) {
          this.cats.push(categories[i].category)
          this.catBarChart.labels.push(categories[i].category)
        }
      },
      async PropertyTypes () {
        const response = await WhenNeededService.PropertyTypes()
        this.typeCal(response.data.property_types)
      },
      typeCal (types) {
        this.propTypes = types.length
        for (let i = 0; i < types.length; i++) {
          this.typo.push(types[i].type)
          this.barChart.labels.push(types[i].type)
        }
      },
      async Lands () {
        const response = await LandService.properties()
        this.properties = response.data.lands.length
        this.catCalculator(response.data.lands)
        this.typoCal(response.data.lands)
      },
      catCalculator (properties) {
        let propCate = this.cats
        for (let i = 0; i < propCate.length; i++) {
          let sum = 0
          for (let a = 0; a < properties.length; a++) {
            if (properties[a].category === propCate[i]) {
              sum += 1
            }
          }
          this.catBarChart.datasets[0].data.push(sum)
        }
        console.log(this.catBarChart.datasets[0].data)
      },
      typoCal (properties) {
        let propTypo = this.typo
        for (let i = 0; i < propTypo.length; i++) {
          let sum = 0
          for (let a = 0; a < properties.length; a++) {
            if (properties[a].type === propTypo[i]) {
              sum += 1
            }
          }
          this.barChart.datasets[0].data.push(sum)
        }
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
