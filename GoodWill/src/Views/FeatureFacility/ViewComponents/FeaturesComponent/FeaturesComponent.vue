<template>
  <v-card class="py-5 px-4">
    <v-container>
      <v-layout row justify-center>
        <v-flex xs12 md12>
          <v-dialog v-model="feature_dialog" persistent max-width="500px">
            <v-btn round slot="activator" class="p-btn" color="primary" dark>
              <v-icon dark left>add</v-icon>
              Add Feature
            </v-btn>
            <v-card>
              <v-card-title>
                <span class="cardTitle">Add Feature</span>
              </v-card-title>
              <v-card-text>
                <div class="errorMessage" v-html="error" />
                <v-container>
                  <v-layout wrap>
                    <v-flex xs12 md12>
                      <v-form ref="FeaturesForm" v-model="feature_valid" lazy-validation>
                        <v-text-field
                        label="Enter Feature*"
                        v-model="feature"
                        :rules="featureRule"
                        required></v-text-field>
                          <v-select
                              :items="categories"
                              v-model="feature_category"
                              item-text="category"
                              item-value="category"
                              label="Select feature's category"
                              :rules="categoryRule"
                              placeholder="Select Category" required
                              cache-items
                            ></v-select>
                      </v-form>
                    </v-flex>
                  </v-layout>
                  <div class="successMessage mt-2" v-html="success" />
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="close_featureDialog">Close</v-btn>
                <v-btn
                  color="blue darken-1"
                  :disabled="!feature_valid"
                  flat
                  :loading="loading"
                  @click.native="AddFeature">Save</v-btn>
              </v-card-actions>
           </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
      <v-layout row my-5>
        <v-flex xs12 md12>
          <v-card>
            <v-card-title>
              ({{features.length}}) registered features
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="features"
              class="elevation-0"
              :search="search"
              prev-icon="mdi-menu-left"
              next-icon="mdi-menu-right"
              sort-icon="mdi-menu-down"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.feature.toUpperCase() }}</td>
                <td class="text-xs-center">{{ props.item.category }}</td>
                <td class="justify-center layout px-0">
                  <v-btn icon class="mx-0" @click="editFeature(props.item)">
                    <v-icon color="teal">edit</v-icon>
                  </v-btn>
                  <v-btn icon class="mx-0" @click="deleteFeature(props.item)">
                    <v-icon color="pink">delete</v-icon>
                  </v-btn>
                </td>
              </template>
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
              </v-alert>
            </v-data-table>
            <v-layout row justify-center>
              <v-dialog v-model="deleteFeature_dialog" max-width="400">
                <v-card>
                  <v-card-text>Are you sure you want to delete {{delete_feature}}.</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click.native="deleteFeature_dialog = false">Cancel</v-btn>
                    <v-btn color="green darken-1" v-show="visible" flat="flat" @click.native="feature_delete">Ok</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="editFeature_dialog" persistent max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="cardTitle">Edit Feature</span>
                  </v-card-title>
                  <v-card-text>
                    <div class="errorMessage" v-html="edit_error" />
                    <v-container fluid>
                      <v-layout wrap>
                        <v-flex xs12 md12>
                          <v-form ref="editFeatureForm" v-model="featureEdit_valid" lazy-validation>
                            <v-text-field
                            label="Feature*"
                            v-model="old_feature"
                            :rules="featureRule"
                            required></v-text-field>
                            <v-select
                              :items="categories"
                              v-model="old_category"
                              item-text="category"
                              item-value="category"
                              label="Select feature's category"
                              :rules="categoryRule"
                              placeholder="Select Category" required
                              cache-items
                              ></v-select>
                          </v-form>
                        </v-flex>
                      </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click.native="cancel_edit">Cancel</v-btn>
                    <v-btn
                      color="green darken-1"
                      :disabled="featureEdit_valid"
                      flat="flat"
                      :loading="edit_button"
                      @click.native="feature_edit">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="message_dialog" max-width="400">
                <v-card>
                  <v-card-text :class="messageClass">{{message}}</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click.native="message_dialog = false">OK</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
  import FeatureFacilityService from '@/Services/FeatureFacilityService'
  export default {
    data () {
      return {
        feature_dialog: false,
        feature_valid: true,
        feature: '',
        search: '',
        category: '',
        feature_category: '',
        categories: ['Car', 'House', 'Land'],
        featureRule: [(v) => !!v || 'Feature required'],
        categoryRule: [(v) => !!v || 'Please select a category.'],
        error: null,
        success: null,
        successMessage: null,
        message_dialog: false,
        messageClass: null,
        editFeature_dialog: false,
        feature_id: null,
        old_category: '',
        new_category: '',
        old_feature: '',
        new_feature: '',
        delete_feature: '',
        message: '',
        edit_error: null,
        visible: true,
        deleteFeature_dialog: false,
        featureEdit_valid: false,
        features: [],
        loading: false,
        edit_button: false,
        headers: [
          {
            text: 'Feature',
            align: 'left',
            sortable: true,
            value: 'feature'
          },
          { text: 'Category', value: 'category', align: 'center' },
          { text: 'Actions', value: 'actions', align: 'center', sortable: false }
        ]
      }
    },
    created () {
      this.Features()
    },
    mounted () {
      this.Features()
    },
    watch: {
      old_feature: function (feature) {
        if (feature.toUpperCase() === this.new_feature && this.old_category === this.new_category) {
          this.featureEdit_valid = true
        } else {
          this.featureEdit_valid = false
        }
      },
      old_category: function (category) {
        if (category === this.new_category && this.old_feature.toUpperCase() === this.new_feature) {
          this.featureEdit_valid = true
        } else {
          this.featureEdit_valid = false
        }
      }
    },
    methods: {
      async Features () {
        const response = await FeatureFacilityService.Features()
        this.features = response.data.features
      },
      async AddFeature () {
        if (this.$refs.FeaturesForm.validate()) {
          this.loading = true
          this.error = ''
          this.success = ''
          const response = await FeatureFacilityService.add_feature({
            'feature': this.feature,
            'category': this.feature_category
          })
          if (response) {
            this.loading = false
            if (response.data.success === true) {
              this.$refs.FeaturesForm.reset()
              this.features = response.data.features
              this.success = response.data.message
            } else {
              this.error = response.data.error
              console.log(this.error)
            }
          }
        } else {
          this.error = 'Feature and category required.'
        }
      },
      close_featureDialog () {
        this.success = ''
        this.$refs.FeaturesForm.reset()
        this.feature_dialog = false
      },
      editFeature (feature) {
        this.old_feature = feature.feature.toUpperCase()
        this.new_feature = feature.feature.toUpperCase()
        this.old_category = feature.category
        this.new_category = feature.category
        this.feature_id = feature.feature_id
        this.editFeature_dialog = true
      },
      cancel_edit () {
        this.edit_error = null
        this.editFeature_dialog = false
      },
      async feature_edit () {
        if (this.$refs.editFeatureForm.validate()) {
          this.edit_button = true
          this.edit_error = null
          const response = await FeatureFacilityService.edit_feature({
            'feature_id': this.feature_id,
            'feature': this.old_feature,
            'category': this.old_category
          })
          if (response) {
            this.edit_button = false
            if (response.data.success === true) {
              this.editFeature_dialog = false
              this.features = response.data.features
              this.message = response.data.message
              this.message_dialog = true
            } else {
              // error_type -> 0 = data_validation (policy error)
              // error_type -> 1 = controller error
              if (response.data.error_type === 0) {
                this.edit_error = response.data.error[0]
              } else if (response.data.error_type === 1) {
                this.edit_error = response.data.error
              }
            }
          }
        }
      },
      deleteFeature (feature) {
        this.old_category = feature.category
        this.feature_id = feature.feature_id
        this.delete_feature = feature.feature
        this.deleteFeature_dialog = true
      },
      async feature_delete () {
        const response = await FeatureFacilityService.delete_feature({
          'feature_id': this.feature_id,
          'category': this.old_category
        })
        if (response.data.success === true) {
          this.deleteFeature_dialog = false
          this.features = response.data.features
          this.message = response.data.message
          this.message_dialog = true
        } else {
          this.error = response.data.error
          console.log(this.error)
        }
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
  .successMessage {
    color: green;
  }
  .p-btn{
    text-transform: capitalize;
  }
  .areaName {
    text-transform: capitalize;
  }
  .cardTitle {
    text-transform: capitalize;
    font-size: 120%;
  }
</style>
