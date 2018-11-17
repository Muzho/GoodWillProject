<template>
  <v-container my-2>
    <v-layout row wrap>
      <v-flex xs12>
        <h4 class="mt-4 grey--text">Property Features and Facilities</h4>
      </v-flex>
      <v-flex xs12 my-4>
        <v-layout row wrap>
          <v-flex xs6 class="pa-2">
            <v-layout row wrap mb-2>
              <v-flex xs6 sm4>
                <v-badge color="red" left>
                  <h3>Features</h3>
                  <span slot="badge">{{ propFeatures.length }}</span>
                </v-badge>
              </v-flex>
              <v-flex xs6 sm8 class="text-xs-left">
                <v-btn color="primary" fab small dark @click="showAddFeature">
                  <v-icon small>add</v-icon>
                </v-btn>
                <v-dialog v-model="addFeatureDialog" max-width="500" persistent>
                  <v-card class="pa-2">
                    <v-card-title>
                      <h3>Add Feature To Property</h3>
                    </v-card-title>
                    <v-card-text>
                      <v-combobox
                          multiple
                          :items="features"
                          v-model="addedFeatures"
                          item-text="feature"
                          item-value="feature_id"
                          label="Select Property Features"
                          :rules="rules.featureRule"
                          placeholder="Select features"
                          chips
                          tags
                        ></v-combobox>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="secondary" round @click.native="closeShowFeature">Cancel</v-btn>
                      <v-btn color="primary"
                        round
                        :disabled="addFeatureValid"
                        @click.native="addFeature">Add Feature</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-flex>
            </v-layout>
            <v-layout row wrap v-if="propFeatures.length > 0">
              <v-flex xs12>
                <p class="feafac pa-0 ma-0" v-for="feature in propFeatures" :key="feature.PropFeaID">
                  <!-- <v-icon small dark color="green">keyboard_arrow_right</v-icon> -->
                  <v-icon small dark color="green" class="mr-2">check</v-icon>
                  {{ feature.featureName }}
                  <v-btn @click.native="showDeleteDialog(feature)" color="red" fab small dark>
                    <v-icon small>remove</v-icon>
                  </v-btn>
                </p>
                <v-dialog class="ml-2" v-model="deleteFeatureDialog" max-width="500">
                  <v-card class="pt-2">
                    <v-card-text>Are you sure you want to remove
                      <span class="fea px-1">{{ featureName }}</span> feature  from the property?</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" flat @click.native="deleteFeatureDialog = false">Cancel</v-btn>
                      <v-btn color="green darken-1" flat @click="removeFeature">Yes</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-flex>
            </v-layout>
            <v-layout row wrap v-else>
              <v-flex xs12>
                <p>Property has no features</p>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs6 class="pa-2">
            <v-layout row wrap mb-2>
              <v-flex xs6 sm4>
                <v-badge color="purple" left>
                  <h3>Facilities</h3>
                  <span slot="badge">{{ propFacilities.length }}</span>
                </v-badge>
              </v-flex>
              <v-flex xs6 sm8 class="text-xs-left">
                <v-btn color="teal" fab small dark @click="showAddFacility">
                  <v-icon small>add</v-icon>
                </v-btn>
                <v-dialog v-model="addFacilityDialog" max-width="500" persistent>
                  <v-card class="pa-2">
                    <v-card-title>
                      <h3>Add Facilities To Property</h3>
                    </v-card-title>
                    <v-card-text>
                      <v-combobox
                          multiple
                          :items="facilities"
                          v-model="addedFacilities"
                          item-text="facility"
                          item-value="facility_id"
                          label="Select Property facilities"
                          :rules="rules.facilityRule"
                          placeholder="Select facilities"
                          chips
                          tags
                        ></v-combobox>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="secondary" round @click.native="closeShowFacility">Cancel</v-btn>
                      <v-btn color="primary"
                        round
                        :disabled="addFacilityValid"
                        @click.native="AddFacility">Add Facility</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-flex>
            </v-layout>
            <v-layout row wrap v-if="propFacilities.length > 0">
              <v-flex xs12>
                <p class="feafac pa-0 ma-0" v-for="facility in propFacilities" :key="facility.PropFacID">
                  <!-- <v-icon small dark color="green">keyboard_arrow_right</v-icon> -->
                  <v-icon small dark color="green" class="mr-2">check</v-icon>
                  {{ facility.facilityName }}
                  <v-btn @click.native="showDeleteFacilityDialog(facility)" color="red" fab small dark>
                    <v-icon small>remove</v-icon>
                  </v-btn>
                </p>
                <v-dialog class="ml-2" v-model="deleteFacilityDialog" max-width="500">
                  <v-card class="pt-2">
                    <v-card-text>Are you sure you want to remove
                      <span class="fac px-1">{{ facilityName }}</span> facility  from the property?</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" flat @click.native="deleteFacilityDialog = false">Cancel</v-btn>
                      <v-btn color="green darken-1" flat @click="removeFacility">Yes</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
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
  import singlePropService from '@/Services/singleProp'
  import FeatureFacilityService from '@/Services/FeatureFacilityService'
  export default {
    props: {
      prop_id: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        features: [],
        propFeatures: [],
        propFacilities: [],
        facilities: [],
        addFeatureValid: true,
        addFeatureDialog: false,
        addFacilityValid: true,
        addFacilityDialog: false,
        propFeature: '',
        propFacility: '',
        deleteFeatureDialog: false,
        deleteFacilityDialog: false,
        addedFeatures: [],
        addedFacilities: [],
        featureID: null,
        featureName: '',
        facilityName: '',
        facilityID: null,
        rules: {
          facilityRule: [(v) => !!v || 'Facilities required'],
          featureRule: [(v) => !!v || 'Features required']
        }
      }
    },
    watch: {
      addedFeatures (features) {
        if (features.length > 0) {
          this.addFeatureValid = false
        } else {
          this.addFeatureValid = true
        }
      },
      addedFacilities (facilities) {
        if (facilities.length > 0) {
          this.addFacilityValid = false
        } else {
          this.addFacilityValid = true
        }
      }
    },
    mounted () {
      this.PropFacFea()
      this.Facilities()
      this.Features()
    },
    created () {
      this.PropFacFea()
      // this.Facilities()
      // this.Features()
    },
    methods: {
      async PropFacFea () {
        try {
          const response = await singlePropService.PropFacFea({
            propID: this.prop_id
          })
          if (response) {
            if (response.data.success === true) {
              this.populateFeatures(response.data.features)
              this.populateFacilities(response.data.facilities)
            } else if (response.data.success === false) {
              console.log(response.data.error)
            }
          }
        } catch (error) {
          console.log(error)
        }
      },
      async Features () {
        const response = await FeatureFacilityService.Features()
        this.featuresNotIncluded(response.data.features)
      },
      showDeleteDialog (feature) {
        this.featureName = feature.featureName
        this.featureID = feature.PropFeaID
        this.deleteFeatureDialog = true
      },
      async removeFeature () {
        try {
          const response = await singlePropService.deletePropertyFeature({
            featureID: this.featureID,
            propID: this.prop_id
          })

          if (response.data.success === true) {
            this.populateFeatures(response.data.propFeatures)
            this.afterFeaDeleteSheeve(response.data.features, response.data.propFeatures)
            this.deleteFeatureDialog = false
          } else if (response.data.success === false) {
            console.log(response.data.error)
          }
        } catch (error) {
          console.log(error)
        }
      },
      showDeleteFacilityDialog (facility) {
        this.facilityName = facility.facilityName
        this.facilityID = facility.PropFacID
        this.deleteFacilityDialog = true
      },
      async removeFacility (facility) {
        console.log(facility)
        try {
          const response = await singlePropService.deletePropertyFacility({
            facilityID: this.facilityID,
            propID: this.prop_id
          })

          if (response.data.success === true) {
            this.populateFacilities(response.data.propFacilities)
            this.afterDelete(response.data.facilities, response.data.propFacilities)
            this.deleteFacilityDialog = false
          } else if (response.data.success === false) {
            console.log(response.data.error)
          }
        } catch (error) {
          console.log(error)
        }
      },
      showAddFeature () {
        this.addFeatureDialog = true
      },
      closeShowFeature () {
        this.addedFeatures = []
        this.addFeatureValid = true
        this.addFeatureDialog = false
      },
      async addFeature () {
        try {
          const response = await singlePropService.addPropertyFeatures({
            propID: this.prop_id,
            features: this.addedFeatures
          })

          if (response) {
            if (response.data.success === true) {
              this.populateFeatures(response.data.features)
              this.afterFeaAdd(response.data.allFeatures, response.data.features)
              this.closeShowFeature()
            } else if (response.data.success === false) {
              console.log(response.data)
            }
          } else {
            console.log('something wrong happened getting the response from the server.')
          }
        } catch (error) {
          console.log(error)
        }
      },
      showAddFacility () {
        this.addFacilityDialog = true
      },
      closeShowFacility () {
        this.addedFacilities = []
        this.addFacilityValid = true
        this.addFacilityDialog = false
      },
      async AddFacility () {
        try {
          const response = await singlePropService.addPropertyFacilities({
            propID: this.prop_id,
            facilities: this.addedFacilities
          })

          if (response) {
            if (response.data.success === true) {
              this.populateFacilities(response.data.facilities)
              this.afterAdd(response.data.allFacilities, response.data.facilities)
              this.closeShowFacility()
            } else if (response.data.success === false) {
              console.log(response.data)
            }
          } else {
            console.log('something wrong happened getting the response from the server.')
          }
        } catch (error) {
          console.log(error)
        }
      },
      featuresNotIncluded (allFeatures) {
        let notIncluded = []
        let qwerty = []
        for (let p = 0; p < this.propFeatures.length; p++) {
          qwerty.push(this.propFeatures[p].feaID)
        }

        for (let i = 0; i < allFeatures.length; i++) {
          if (!qwerty.includes(allFeatures[i].feature_id)) {
            notIncluded.push(allFeatures[i])
          }
        }
        this.features = notIncluded
      },
      async Facilities () {
        const response = await FeatureFacilityService.Facilities()
        this.facilitiesNotIncluded(response.data.facilities)
      },
      facilitiesNotIncluded (allfacilities) {
        let notIncluded = []
        let qwerty = []
        for (let p = 0; p < this.propFacilities.length; p++) {
          qwerty.push(this.propFacilities[p].facID)
        }

        for (let i = 0; i < allfacilities.length; i++) {
          if (!qwerty.includes(allfacilities[i].facility_id)) {
            notIncluded.push(allfacilities[i])
          }
        }
        this.facilities = notIncluded
      },
      afterFeaDeleteSheeve (allFeatures, propFeatures) {
        let notIncluded = []
        let qwerty = []
        for (let p = 0; p < propFeatures.length; p++) {
          qwerty.push(propFeatures[p].feature)
        }

        for (let i = 0; i < allFeatures.length; i++) {
          if (!qwerty.includes(allFeatures[i].feature_id)) {
            notIncluded.push(allFeatures[i])
          }
        }
        this.features = notIncluded
      },
      afterDelete (allFacilities, propFacilities) {
        let notIncluded = []
        let qwerty = []
        for (let p = 0; p < propFacilities.length; p++) {
          qwerty.push(propFacilities[p].facility)
        }

        for (let i = 0; i < allFacilities.length; i++) {
          if (!qwerty.includes(allFacilities[i].facility_id)) {
            notIncluded.push(allFacilities[i])
          }
        }
        this.facilities = notIncluded
      },
      afterFeaAdd (allFeatures, propFeatures) {
        let notIncluded = []
        let qwerty = []
        for (let p = 0; p < propFeatures.length; p++) {
          qwerty.push(propFeatures[p].feaID)
        }
        for (let i = 0; i < allFeatures.length; i++) {
          if (!qwerty.includes(allFeatures[i].feature_id)) {
            notIncluded.push(allFeatures[i])
          }
        }
        this.features = notIncluded
      },
      afterAdd (allFacilities, propFacilities) {
        let notIncluded = []
        let qwerty = []
        for (let p = 0; p < propFacilities.length; p++) {
          qwerty.push(propFacilities[p].facID)
        }
        for (let i = 0; i < allFacilities.length; i++) {
          if (!qwerty.includes(allFacilities[i].facility_id)) {
            notIncluded.push(allFacilities[i])
          }
        }
        this.facilities = notIncluded
      },
      populateFeatures (features) {
        this.propFeatures = features
      },
      populateFacilities (facilities) {
        this.propFacilities = facilities
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
