<template>
  <v-card class="py-5 px-4">
    <v-container>
      <v-layout row justify-center>
        <v-flex xs12 md12>
          <v-dialog v-model="facility_dialog" persistent max-width="500px">
            <v-btn round slot="activator" class="p-btn" color="primary" dark>
              <v-icon dark left>add</v-icon>
              Add Facility
            </v-btn>
            <v-card>
              <v-card-title>
                <span class="cardTitle">Add Facility</span>
              </v-card-title>
              <v-card-text>
                <div class="errorMessage" v-html="error" />
                <v-container>
                  <v-layout wrap>
                    <v-flex xs12 md12>
                      <v-form ref="FacilityForm" v-model="facility_valid" lazy-validation>
                        <v-text-field
                        label="Enter the facility name*"
                        v-model="facility"
                        :rules="facilityRule"
                        required></v-text-field>
                          <v-select
                              :items="categories"
                              v-model="facility_category"
                              item-text="category"
                              item-value="category"
                              label="Select facility's category"
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
                <v-btn color="blue darken-1" flat @click.native="close_facilityDialog">Close</v-btn>
                <v-btn
                  color="blue darken-1"
                  :disabled="!facility_valid"
                  flat
                  :loading="loading"
                  @click.native="AddFacility">Save</v-btn>
              </v-card-actions>
           </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
      <v-layout row my-5>
        <v-flex xs12 md12>
          <v-card>
            <v-card-title>
              ({{facilities.length}}) registered facilities
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
              :items="facilities"
              class="elevation-0"
              :search="search"
              prev-icon="mdi-menu-left"
              next-icon="mdi-menu-right"
              sort-icon="mdi-menu-down"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.facility.toUpperCase() }}</td>
                <td class="text-xs-center">{{ props.item.category }}</td>
                <td class="justify-center layout px-0">
                  <v-btn icon class="mx-0" @click="editFacility(props.item)">
                    <v-icon color="teal">edit</v-icon>
                  </v-btn>
                  <v-btn icon class="mx-0" @click="deleteFacility(props.item)">
                    <v-icon color="pink">delete</v-icon>
                  </v-btn>
                </td>
              </template>
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
              </v-alert>
            </v-data-table>
            <v-layout row justify-center>
              <v-dialog v-model="deleteFacility_dialog" max-width="400">
                <v-card>
                  <v-card-text>Are you sure you want to delete {{delete_facility}}.</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click.native="deleteFacility_dialog = false">Cancel</v-btn>
                    <v-btn color="green darken-1" v-show="visible" flat="flat" @click.native="facility_delete">Ok</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="editFacility_dialog" persistent max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="">Edit Area</span>
                  </v-card-title>
                  <v-card-text>
                    <div class="errorMessage" v-html="edit_error" />
                    <v-container fluid>
                      <v-layout wrap>
                        <v-flex xs12 md12>
                          <v-form ref="editFacilityForm" v-model="facilityEdit_valid" lazy-validation>
                            <v-text-field
                            label="Facility name*"
                            v-model="old_facility"
                            :rules="facilityRule"
                            required></v-text-field>
                            <v-select
                                :items="categories"
                                v-model="old_category"
                                item-text="category"
                                item-value="category"
                                label="Select facility's city"
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
                      :disabled="facilityEdit_valid"
                      flat="flat"
                      :loading="edit_button"
                      @click.native="facility_edit">Save</v-btn>
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
        facility_dialog: false,
        facility_valid: true,
        facility: '',
        search: '',
        facility_category: '',
        categories: ['Car', 'House', 'Land'],
        facilityRule: [(v) => !!v || 'Facility name is required'],
        categoryRule: [(v) => !!v || 'Please select a category.'],
        error: null,
        success: null,
        successMessage: null,
        message_dialog: false,
        messageClass: null,
        editFacility_dialog: false,
        facility_id: null,
        old_category: null,
        new_category: null,
        old_facility: '',
        new_facility: '',
        delete_facility: '',
        message: '',
        edit_error: null,
        visible: true,
        deleteFacility_dialog: false,
        facilityEdit_valid: false,
        facilities: [],
        loading: false,
        edit_button: false,
        headers: [
          {
            text: 'Facility',
            align: 'left',
            sortable: true,
            value: 'facility'
          },
          { text: 'Category', value: 'category', align: 'center' },
          { text: 'Actions', value: 'actions', align: 'center', sortable: false }
        ]
      }
    },
    created () {
      this.Facilities()
    },
    mounted () {
      this.Facilities()
    },
    watch: {
      old_facility: function (facility) {
        if (facility.toUpperCase() === this.new_facility && this.old_category === this.new_category) {
          this.facilityEdit_valid = true
        } else {
          this.facilityEdit_valid = false
        }
      },
      old_category: function (category) {
        if (category === this.new_category && this.old_facility.toUpperCase() === this.new_facility) {
          this.facilityEdit_valid = true
        } else {
          this.facilityEdit_valid = false
        }
      }
    },
    methods: {
      async Facilities () {
        const response = await FeatureFacilityService.Facilities()
        this.facilities = response.data.facilities
      },
      async AddFacility () {
        if (this.$refs.FacilityForm.validate()) {
          this.loading = true
          this.error = ''
          this.success = ''
          const response = await FeatureFacilityService.AddFacility({
            'facility': this.facility,
            'category': this.facility_category
          })
          if (response) {
            this.loading = false
            if (response.data.success === true) {
              this.$refs.FacilityForm.reset()
              this.facilities = response.data.facilities
              this.success = response.data.message
            } else {
              this.error = response.data.error
            }
          }
        } else {
          this.error = 'Facility name and category required.'
        }
      },
      close_facilityDialog () {
        this.success = ''
        this.$refs.FacilityForm.reset()
        this.facility_dialog = false
      },
      editFacility (facility) {
        this.old_facility = facility.facility.toUpperCase()
        this.new_facility = facility.facility.toUpperCase()
        this.new_category = facility.category
        this.old_category = facility.category
        this.facility_id = facility.facility_id
        this.editFacility_dialog = true
      },
      cancel_edit () {
        this.edit_error = null
        this.editFacility_dialog = false
      },
      async facility_edit () {
        if (this.$refs.editFacilityForm.validate()) {
          this.edit_button = true
          this.edit_error = null
          const response = await FeatureFacilityService.edit_facility({
            'facility_id': this.facility_id,
            'facility': this.old_facility,
            'category': this.new_category
          })
          if (response) {
            this.edit_button = false
            if (response.data.success === true) {
              this.editFacility_dialog = false
              this.facilities = response.data.facilities
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
      deleteFacility (facility) {
        this.facility_id = facility.facility_id
        this.delete_facility = facility.facility
        this.old_category = facility.category
        this.deleteFacility_dialog = true
      },
      async facility_delete () {
        const response = await FeatureFacilityService.delete_facility({
          'facility_id': this.facility_id,
          'category': this.old_category
        })
        if (response.data.success === true) {
          this.deleteFacility_dialog = false
          this.facilities = response.data.facilities
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
  .cardTitle {
    text-transform: capitalize;
    font-size: 120%;
  }
</style>
