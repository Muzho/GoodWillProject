<template>
    <v-card mt-3 mb-3>
      <v-card-title class="mb-3 cardTitle">Properties Statistics</v-card-title>
      <v-card-text>
        <v-container>
          <v-layout flex>
            <v-flex xs12 class="text-xs-center">
              <div class="mainStat">
                {{ properties }}
              </div>
              <span>Properties</span>
            </v-flex>
          </v-layout>
          <hr class="my-5 mx-5">
          <v-layout row wrap mt-4>
            <v-flex my-4 xs12 class="text-xs-center">
              <h3>Property Types</h3>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <div class="otherStat">
                {{ forRent }}
              </div>
              <span>For Rent</span>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <div class="otherStat">
                {{ forSale }}
              </div>
              <span>For Sale</span>
            </v-flex>
          </v-layout>
          <hr class="my-5 mx-5">
          <v-layout row wrap>
            <v-flex my-4 xs12 class="text-xs-center">
              <h3>Property Categories</h3>
            </v-flex>
            <v-flex my-4 xs6 class="text-xs-center">
              <div class="otherStat">
                {{ lands }}
              </div>
              <span>Plots and Land</span>
            </v-flex>
            <v-flex my-4 xs6 class="text-xs-center">
              <div class="otherStat">
                {{ houses }}
              </div>
              <span>Houses</span>
            </v-flex>
            <v-flex my-4 xs6 class="text-xs-center">
              <div class="otherStat">
                {{ apartments }}
              </div>
              <span>Apartments</span>
            </v-flex>
            <v-flex my-4 xs6 class="text-xs-center">
              <div class="otherStat">
                {{ offices }}
              </div>
              <span>Offices</span>
            </v-flex>
            <v-flex my-4 xs6 class="text-xs-center">
              <div class="otherStat">
                {{ spaceToLet }}
              </div>
              <span>Spaces To Let</span>
            </v-flex>
            <v-flex my-4 xs6 class="text-xs-center">
              <div class="otherStat">
                {{ wareHouses }}
              </div>
              <span>Ware Houses</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
</template>

<script>
  export default {
    props: {
      properties: {
        type: Number,
        required: true
      },
      forRent: {
        type: Number,
        required: true
      },
      forSale: {
        type: Number,
        required: true
      },
      apartments: {
        type: Number,
        required: true
      },
      houses: {
        type: Number,
        required: true
      },
      lands: {
        type: Number,
        required: true
      },
      spaceToLet: {
        type: Number,
        required: true
      },
      offices: {
        type: Number,
        required: true
      },
      wareHouses: {
        type: Number,
        required: true
      }
    }
  }
</script>

<style scoped>
  .cardTitle {
    text-transform: capitalize;
    font-size: 120%;
    text-align: center;
  }
  .mainStat {
    font-size: 400%;
  }
  .otherStat {
    font-size: 200%;
  }
</style>
