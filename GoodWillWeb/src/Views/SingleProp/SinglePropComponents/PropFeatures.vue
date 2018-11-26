<template>
  <v-container my-2>
    <v-layout row wrap>
      <v-flex xs12>
        <h4 class="mt-4 grey--text">Property Features and Facilities</h4>
      </v-flex>
      <v-flex xs12 my-4>
        <v-layout row wrap>
          <v-flex xs6 class="pa-2">
            <v-layout row wrap>
              <v-flex xs12>
                <h3>Features</h3>
              </v-flex>
            </v-layout>
            <v-layout row wrap v-if="propFeatures.length > 0">
              <v-flex xs12>
                <p v-for="feature in propFeatures" :key="feature.PropFeaID">
                  <!-- <v-icon small dark color="green">keyboard_arrow_right</v-icon> -->
                  <v-icon small dark color="green" class="mr-2">check</v-icon>
                  {{ feature.featureName }}
                </p>
              </v-flex>
            </v-layout>
            <v-layout row wrap v-else>
              <v-flex xs12>
                <p>Property has no features</p>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs6 class="pa-2">
            <v-layout row wrap>
              <v-flex xs12>
                <h3>Facilities</h3>
              </v-flex>
            </v-layout>
            <v-layout row wrap v-if="propFacilities.length > 0">
              <v-flex xs12>
                <p v-for="facility in propFacilities" :key="facility.PropFacID">
                  <!-- <v-icon small dark color="green">keyboard_arrow_right</v-icon> -->
                  <v-icon small dark color="green" class="mr-2">check</v-icon>
                  {{ facility.facilityName }}
                </p>
              </v-flex>
            </v-layout>
            <v-layout row wrap v-else>
              <v-flex xs12>
                <p>Property has no facilities</p>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import singlePropService from '@/Services/singleProperty/singleProperty'
  export default {
    props: {
      prop_id: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        propFeatures: [],
        propFacilities: []
      }
    },
    mounted () {
      this.PropFacFea()
    },
    created () {
      this.PropFacFea()
    },
    methods: {
      async PropFacFea () {
        try {
          const response = await singlePropService.PropFacFea({
            propID: this.prop_id
          })
          if (response) {
            if (response.data.success === true) {
              this.propFeatures = response.data.features
              this.propFacilities = response.data.facilities
            } else if (response.data.success === false) {
              console.log(response.data.error)
            }
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .fea {
    font-weight: 600;
    color: red;
  }
</style>
