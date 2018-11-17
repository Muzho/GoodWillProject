g<template>
  <v-layout my-3 row wrap>
    <v-flex xs12 sm4 md4 class="pa-1">
      <v-card class="pa-2" dark raised color="pink darken-4" height="100%" hover>
        <v-card-title>
          <span>GoodWill Properties</span>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs4>
              <span class="titleStat">{{ properties }}</span>
              <p>Total Properties</p>
            </v-flex>
            <v-flex xs8 class="text-xs-center">
              <v-layout row wrap>
                <v-flex xs6>
                  <span class="titleStatat">{{ types }}</span>
                  <p class="statWords">
                    Property Types
                  </p>
                </v-flex>
                <v-flex xs6>
                  <span class="titleStatat">{{ categories }}</span>
                  <p class="statWords">
                    Property Categories
                  </p>
                </v-flex>
              <v-flex xs12 class="mt-4 text-xs-right">
                <v-icon x-large>domain</v-icon>
              </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 sm4 md4 class="pa-1">
      <v-card class="pa-2" dark tile raised color="teal darken-4" height="100%" hover>
        <v-card-title>
          <span>GoodWill Cars</span>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs4>
              <span class="titleStat">{{ cars }}</span>
              <p>Total Vehicles</p>
            </v-flex>
            <v-flex xs8 class="text-xs-center">
              <v-layout row wrap>
                <v-flex xs6>
                  <span class="titleStatat">{{ types }}</span>
                  <p class="statWords">
                    vehicle Types
                  </p>
                </v-flex>
                <v-flex xs6>
                  <span class="titleStatat">{{ categories }}</span>
                  <p class="statWords">
                    Vechile Categories
                  </p>
                </v-flex>
                <v-flex xs12 class="mt-4 text-xs-right">
                  <v-icon x-large>local_taxi</v-icon>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 sm4 md4 class="pa-1">
      <v-card class="pa-2" dark tile raised color="orange darken-4" hover height="100%">
        <v-card-title>
          <span>GoodWill Members</span>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs4>
              <span class="titleStat">{{ users }}</span>
              <p>Members</p>
            </v-flex>
            <v-flex xs8 class="text-xs-center">
              <v-layout row wrap>
                <v-flex xs6>
                  <span class="titleStatat">{{ femaleUsers }}</span>
                  <p class="statWords">
                    Female
                  </p>
                </v-flex>
                <v-flex xs6>
                  <span class="titleStatat">{{ maleUsers }}</span>
                  <p class="statWords">
                    Male
                  </p>
                </v-flex>
              <v-flex xs12 class="mt-4 text-xs-right">
                <v-icon x-large>people</v-icon>
              </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props: {
      properties: {
        type: Number,
        required: true
      },
      types: {
        type: Number,
        required: true
      },
      categories: {
        type: Number,
        required: true
      },
      features: {
        type: Number,
        required: true
      },
      facilities: {
        type: Number,
        required: true
      },
      femaleUsers: {
        type: Number,
        required: true
      },
      maleUsers: {
        type: Number,
        required: true
      },
      lands: {
        type: Number,
        required: true
      },
      spacetolet: {
        type: Number,
        required: true
      },
      warehouses: {
        type: Number,
        required: true
      },
      offices: {
        type: Number,
        required: true
      },
      cars: {
        type: Number,
        required: true
      },
      owners: {
        type: Number,
        required: true
      },
      users: {
        type: Number,
        required: true
      }
    },
    data () {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .titleStat {
    font-size: 350%;
  }
  .titleStatat {
    font-size: 150%;
    font-weight: 500;
  }
  .statWords {}
</style>
