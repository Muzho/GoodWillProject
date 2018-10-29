<template>
  <div class="mainDiv">
    <app-header></app-header>
    <v-container>
      <v-slide-y-transition mode="out-in">
        <v-layout row wrap>
          <v-flex xs12>
            <h1 class="primary--text mt-5 ml-2">{{page_title}}</h1>
            <app-breadcrumb v-bind:items="pages"></app-breadcrumb>
          </v-flex>
        </v-layout>
      </v-slide-y-transition>
      <v-layout row wrap mt-4>
        <v-flex xs12 sm4 md4>
          <span class="secondary--text  ml-3">{{cars.length}} Cars</span>
        </v-flex>
        <v-flex xs12 sm8 md8 class="text-md-right text-sm-right">
          <v-dialog v-model="add_landDialog" persistent>
            <v-btn round slot="activator" class="p-btn" color="primary" dark>
              <v-icon dark left>control_point</v-icon>
              Add Car
            </v-btn>
            <v-card>
              <v-card-title>
                <span class="">Add Car</span>
              </v-card-title>
              <v-card-text>
                <div class="errorMessage" v-html="addLand_error" />
                <v-container>
                  <v-layout wrap>
                    <v-flex xs12 md12>
                      <v-form ref="LandForm" v-model="land_valid" lazy-validation>
                        <v-text-field
                        label="Enter the property title*"
                        v-model="prop_title"
                        :rules="nameRules"
                        required></v-text-field>
                          <!-- <v-select
                              :items="area_cities"
                              v-model="area_city"
                              item-text="city_name"
                              item-value="city_id"
                              label="Select area's region"
                              :rules="[(v) => !!v || 'City is required']"
                              placeholder="Select City" required
                              cache-items
                            ></v-select> -->
                      </v-form>
                    </v-flex>
                  </v-layout>
                  <div class="successMessage mt-2" v-html="success" />
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="cancel_addLand">Close</v-btn>
                <v-btn
                  color="blue darken-1"
                  :disabled="!land_valid"
                  flat
                  :loading="loading"
                  @click.native="AddLand">Save</v-btn>
              </v-card-actions>
           </v-card>
          </v-dialog>

          <!-- Add  feature / facility  dialog -->
          <v-dialog v-model="add_feaDialog" persistent max-width="500px">
            <v-btn round slot="activator" class="p-btn" color="primary" dark>
              <v-icon dark left>control_point</v-icon>
              Add Car Feature / Facility
            </v-btn>
            <v-card>
              <v-card-title>
                <span class="">Add Car Feature / Facility</span>
              </v-card-title>
              <v-card-text>
                <div class="errorMessage" v-html="addFea_error" />
                <v-container>
                  <v-layout wrap>
                    <v-flex xs12 md12>
                      <v-form ref="FeaForm" v-model="fea_valid" lazy-validation>
                        <v-text-field
                        label="Enter the feature / facility name*"
                        v-model="fea_name"
                        :rules="featureRule"
                        required></v-text-field>
                      </v-form>
                    </v-flex>
                  </v-layout>
                  <div class="successMessage mt-2" v-html="add_featureSuccess" />
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="cancel_addFea">Close</v-btn>
                <v-btn
                  color="blue darken-1"
                  :disabled="!fea_valid"
                  flat
                  :loading="loading"
                  @click.native="AddFea">Save</v-btn>
              </v-card-actions>
           </v-card>
          </v-dialog>
        </v-flex>

        <v-flex xs12 v-if="cars.length > 0"></v-flex>
        <v-flex xs12 v-else class="text-xs-center">
          <p class="pt-5">No cars added yet.</p>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        page_title: 'Cars',
        pages: [
          {
            text: 'Home',
            pageUrl: '/Dashboard',
            disabled: false
          },
          {
            text: 'Cars',
            pageUrl: '/Cars',
            disabled: true
          }
        ],
        cars: [],
        add_landDialog: false,
        add_feaDialog: false,
        addLand_error: null,
        addFea_error: null,
        success: null,
        add_featureSuccess: null,
        addFea_btn: false,
        loading: false,
        land_valid: true,
        fea_valid: true,
        prop_title: '',
        fea_name: '',
        featureRule: [(v) => !!v || 'Feature / Facility name required'],
        nameRules: [(v) => !!v || 'Property title required']
      }
    },
    methods: {
      cancel_addLand () {
        this.success = null
        this.addLand_error = null
        this.add_landDialog = false
      },
      AddLand () {
        console.log('Can add land now.')
      },
      cancel_addFea () {
        this.add_featureSuccess = null
        this.addFea_error = null
        this.add_feaDialog = false
      },
      AddFea () {
        console.log('Can add land feature / Facility now.')
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
  .tabTitle {
    text-transform: capitalize;
  }
  .p-btn{
    text-transform: capitalize;
  }
</style>
