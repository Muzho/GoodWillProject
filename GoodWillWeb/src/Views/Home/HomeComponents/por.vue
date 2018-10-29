<template>
  <v-container my-5>
    <v-layout row wrap>
      <v-flex xs6>
        <h2 class="mb-4 primary--text">Properties for rent</h2>
      </v-flex>
      <v-flex xs6 text-xs-right>
        <router-link :to="'/'" exact>
          Show all ({{pors.length}}) <v-icon color="primary">navigate_next</v-icon>
        </router-link>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex px-1 py-2 xs12 sm4 md3 v-for="por in pors.slice(0, 8)" :key="por.prop_id">
        <v-card height="100%" flat
        v-bind:to="{path: '/SingleProp/' + por.prop_id}" exact>
          <v-card-media
            :src="por.img"
            height="200px"
          ></v-card-media>
          <v-card-text class="pt-2 pb-0">
            {{ por.type }} . {{ por.location }}
          </v-card-text>
          <v-card-title class="pb-0 pt-0" primary-title>
            <h3>{{ por.title }}</h3>
          </v-card-title>
          <v-card-text class="pb-3 pt-0">
            Ugx. {{ por.price }} per month
          </v-card-text>
          <!-- <v-card-text class="mt-0 pt-0">
            <span class="mr-3">
              <v-icon>hotel</v-icon> {{ por.bedrooms }}
            </span>
            <span>
              <v-icon>hot_tub</v-icon> {{ por.bathrooms }}
            </span>
          </v-card-text> -->
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
