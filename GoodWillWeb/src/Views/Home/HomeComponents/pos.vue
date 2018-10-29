<template>
  <v-container my-5>
    <v-layout row>
      <v-flex xs6>
        <h2 class="mb-4 primary--text">Properties on sale</h2>
      </v-flex>
      <v-flex xs6 text-xs-right>
        <router-link :to="'/'" exact>
          Show all ({{poss.length}}) <v-icon color="primary">keyboard_arrow_right</v-icon>
        </router-link>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex px-1 py-2 xs12 sm4 md3 v-for="pos in poss.slice(0, 8)" :key="pos.prop_id">
        <v-card flat class="posCards" height="100%"
        v-bind:to="{path: '/SingleProp/' + pos.prop_id}" exact>
          <v-card-media
            :src="pos.img"
            height="200px"
          ></v-card-media>
          <v-card-text class="pb-0 pt-2">
            {{ pos.type }} . {{ pos.location }}
          </v-card-text>
          <v-card-title class="py-0" primary-title>
            <h3>{{ pos.title }}</h3>
          </v-card-title>
          <v-card-text class="pb-3 pt-0">
            Ugx. {{ pos.price }}
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: {
      poss: {
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
  .posCards {
    border: 0px;
  }
</style>
