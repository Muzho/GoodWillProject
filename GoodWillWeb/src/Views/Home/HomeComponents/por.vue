<template>
  <v-container my-5>
    <v-layout row wrap>
      <v-flex xs6>
        <h2 class="mb-4 primary--text">Properties for rent</h2>
      </v-flex>
      <v-flex xs6 text-xs-right>
        <router-link :to="'/'" exact>View more ...</router-link>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex px-1 xs12 sm4 md3 v-for="por in pors" :key="por.id">
        <v-card height="100%" hover
        v-bind:to="{path: '/SingleProp/' + por.id}" exact>
          <v-card-media
            :src="por.propImg"
            height="200px"
          ></v-card-media>
          <v-card-title class="pb-0" primary-title>
            <h3>{{ por.propTitle }} in {{ por.propArea }}, {{ por.city }}</h3>
          </v-card-title>
          <v-card-text class="pb-0 pt-0">
            Ugx. {{ por.amount }} per month
          </v-card-text>
          <v-card-text class="mt-0 pt-0">
            <span class="mr-3">
              <v-icon>hotel</v-icon> {{ por.bedrooms }}
            </span>
            <span>
              <v-icon>hot_tub</v-icon> {{ por.bathrooms }}
            </span>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: {
      pors: {
        type: Array,
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
</style>
