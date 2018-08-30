<template>
  <v-container my-2>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <span>
              Ugx. 1,200,000 per Month
            </span>
          </v-card-text>
          <v-card-text>
            <span>
              <v-icon>place</v-icon> Plot 56, Tankhill Road - Naguru, Kampala
            </span>
          </v-card-text>
          <v-card-text></v-card-text>
          <v-card-text>
            <span>This home is on people’s minds.</span><br>
            <span>It’s been viewed 500+ times in the past week.</span>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: {
      propViews: {
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
