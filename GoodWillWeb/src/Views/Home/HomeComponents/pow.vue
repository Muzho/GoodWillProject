<template>
  <v-container mt-2>
    <v-layout row wrap>
      <v-flex xs6>
        <h2 class="mb-4 primary--text">Properties of the week</h2>
      </v-flex>
      <v-flex xs6 text-xs-right>
        <router-link :to="'/'" exact>
          Show all ({{pows.length}}) <v-icon color="primary">navigate_next</v-icon>
        </router-link>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex px-1 mb-2 xs12 sm4 md3 v-for="pow in pows" :key="pow.id">
        <v-card height="100%" hover v-bind:to="'/'" exact>
          <v-card-media
            :src="pow.propImg"
            height="160px"
          ></v-card-media>
          <v-card-title class="pb-0" primary-title>
            <span>{{ pow.propTitle }} in {{ pow.propArea }}, {{ pow.city }}</span>
          </v-card-title>
          <v-card-text class="pt-0">
            <div v-if="pow.propCat === 'Sale'">
              <span class="orange--text">
                For {{ pow.propCat }}
              </span><br>
              <span>
                Ugx. {{ pow.amount }}
              </span>
            </div>
            <div v-else>
              <span class="teal--text">
                For {{ pow.propCat }}
              </span><br>
              <span>
                Ugx. {{ pow.amount }} per month
              </span>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: {
      pows: {
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
