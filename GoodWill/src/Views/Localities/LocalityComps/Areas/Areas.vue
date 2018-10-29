<template>
  <v-card class="py-5 px-4">
    <v-container>
      <v-layout row justify-center>
        <v-flex xs12 md12>
          <v-dialog v-model="area_dialog" persistent max-width="500px">
            <v-btn round slot="activator" class="p-btn" color="primary" dark>
              <v-icon dark left>add_location</v-icon>
              Add Place
            </v-btn>
            <v-card>
              <v-card-title>
                <span class="">Add Place</span>
              </v-card-title>
              <v-card-text>
                <div class="errorMessage" v-html="error" />
                <v-container>
                  <v-layout wrap>
                    <v-flex xs12 md12>
                      <v-form ref="AreaForm" v-model="area_valid" lazy-validation>
                        <v-text-field
                        label="Enter the place name*"
                        v-model="place_name"
                        :rules="nameRules"
                        required></v-text-field>
                          <v-select
                              :items="area_cities"
                              v-model="area_city"
                              item-text="city_name"
                              item-value="city_id"
                              label="Select area's region"
                              :rules="[(v) => !!v || 'City is required']"
                              placeholder="Select City" required
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
                <v-btn color="blue darken-1" flat @click.native="clearMessage">Close</v-btn>
                <v-btn
                  color="blue darken-1"
                  :disabled="!area_valid"
                  flat
                  :loading="loading"
                  @click.native="AddArea">Save</v-btn>
              </v-card-actions>
           </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
      <v-layout row my-5>
        <v-flex xs12 md12>
          <v-card>
            <v-card-title>
              Areas where we opearate: ({{areas.length}})
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
              :items="areas"
              class="elevation-0"
              :search="search"
              prev-icon="mdi-menu-left"
              next-icon="mdi-menu-right"
              sort-icon="mdi-menu-down"
            >
              <template slot="items" slot-scope="props">
                <td class="areaName">{{ props.item.area_name.toUpperCase() }}</td>
                <td class="text-xs-center">{{ props.item.city_name }}</td>
                <td class="justify-center layout px-0">
                  <v-btn icon class="mx-0" @click="editArea(props.item)">
                    <v-icon color="teal">edit</v-icon>
                  </v-btn>
                  <v-btn icon class="mx-0" @click="deleteArea(props.item)">
                    <v-icon color="pink">delete</v-icon>
                  </v-btn>
                  <!-- <v-btn icon class="mx-0">
                    <v-icon color="cyan">visibility</v-icon>
                  </v-btn> -->
                </td>
              </template>
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
              </v-alert>
            </v-data-table>
            <v-layout row justify-center>
              <v-dialog v-model="deleteArea_dialog" max-width="400">
                <v-card>
                  <v-card-text>Are you sure you want to delete {{delete_area}}.</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click.native="deleteArea_dialog = false">Cancel</v-btn>
                    <v-btn color="green darken-1" v-show="visible" flat="flat" @click.native="city_delete">Ok</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="editArea_dialog" persistent max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="">Edit Area</span>
                  </v-card-title>
                  <v-card-text>
                    <div class="errorMessage" v-html="edit_error" />
                    <v-container fluid>
                      <v-layout wrap>
                        <v-flex xs12 md12>
                          <v-form ref="editAreaForm" v-model="areaEdit_valid" lazy-validation>
                            <v-text-field
                            label="Area name*"
                            v-model="old_area"
                            :rules="nameRules"
                            required></v-text-field>
                            <v-select
                                :items="area_cities"
                                v-model="new_city"
                                item-text="city_name"
                                item-value="city_id"
                                label="Select area's city"
                                :rules="[(v) => !!v || 'City is required']"
                                placeholder="Select City" required
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
                      :disabled="areaEdit_valid"
                      flat="flat"
                      :loading="edit_button"
                      @click.native="area_edit">Save</v-btn>
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
  import LocalityService from '@/Services/LocalityServices'
  export default {
    data () {
      return {
        area_dialog: false,
        area_valid: true,
        place_name: '',
        search: '',
        city: null,
        area_city: '',
        area_cities: [],
        nameRules: [(v) => !!v || 'Place/area name is required'],
        cityRules: [(v) => !!v || 'Please selct a city.'],
        error: null,
        success: null,
        successMessage: null,
        message_dialog: false,
        messageClass: null,
        editArea_dialog: false,
        area_id: null,
        city_id: null,
        new_city: null,
        old_area: '',
        new_area: '',
        delete_area: '',
        message: '',
        edit_error: null,
        visible: true,
        deleteArea_dialog: false,
        areaEdit_valid: false,
        areas: [],
        loading: false,
        edit_button: false,
        headers: [
          {
            text: 'Area Name',
            align: 'left',
            sortable: true,
            value: 'area_name'
          },
          { text: 'City', value: 'city', align: 'center' },
          { text: 'Actions', value: 'actions', align: 'center', sortable: false }
        ]
      }
    },
    created () {
      this.Areas()
      this.Cities()
    },
    mounted () {
      this.Areas()
      this.Cities()
    },
    watch: {
      old_area: function (areaName) {
        if (areaName.toUpperCase() === this.new_area && this.new_city === this.city) {
          this.areaEdit_valid = true
        } else {
          this.areaEdit_valid = false
        }
      },
      new_city: function (cityID) {
        if (cityID === this.city && this.old_area.toUpperCase() === this.new_area) {
          this.areaEdit_valid = true
        } else {
          this.areaEdit_valid = false
        }
      }
    },
    methods: {
      async Areas () {
        const response = await LocalityService.areas()
        this.areas = response.data.areas
      },
      async Cities () {
        const response = await LocalityService.cities()
        this.area_cities = response.data.cities
        // .replace(/\b\w/g, l => l.toUpperCase()) capitalize
      },
      async AddArea () {
        if (this.$refs.AreaForm.validate()) {
          this.loading = true
          this.error = ''
          this.success = ''
          const response = await LocalityService.add_area({
            'area_name': this.place_name,
            'city_id': this.area_city
          })
          if (response) {
            this.loading = false
            if (response.data.success === true) {
              this.$refs.AreaForm.reset()
              this.areas = response.data.areas
              this.success = response.data.message
            } else {
              this.error = response.data.error
              console.log(this.error)
            }
          }
        } else {
          this.error = 'Area name and city required.'
        }
      },
      clearMessage () {
        this.success = ''
        this.area_dialog = false
      },
      editArea (area) {
        this.old_area = area.area_name.toUpperCase()
        this.new_area = area.area_name.toUpperCase()
        this.new_city = area.city_id
        this.area_id = area.area_id
        this.city = area.city_id
        this.editArea_dialog = true
      },
      cancel_edit () {
        this.edit_error = null
        this.editArea_dialog = false
      },
      async area_edit () {
        if (this.$refs.editAreaForm.validate()) {
          this.edit_button = true
          this.edit_error = null
          const response = await LocalityService.edit_area({
            'area_id': this.area_id,
            'area_name': this.old_area,
            'city_id': this.new_city
          })
          if (response) {
            this.edit_button = false
            if (response.data.success === true) {
              this.editArea_dialog = false
              this.areas = response.data.areas
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
      deleteArea (area) {
        this.city = area.city_id
        this.area_id = area.area_id
        this.delete_area = area.area_name
        this.deleteArea_dialog = true
      },
      async city_delete () {
        const response = await LocalityService.delete_area({
          'area_id': this.area_id,
          'city_id': this.city
        })
        if (response.data.success === true) {
          this.deleteArea_dialog = false
          this.areas = response.data.areas
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
</style>
