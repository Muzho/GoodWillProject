<template>
  <v-card class="py-5 px-4">
    <v-container>
      <v-layout row justify-center>
        <v-flex xs12 md12>
          <v-dialog v-model="city_dialog" persistent max-width="500px">
            <v-btn round slot="activator" class="p-btn" color="primary" dark>
              <v-icon dark left>near_me</v-icon>
              Add City
            </v-btn>
            <v-card>
              <v-card-title>
                <span class="">Add City</span>
              </v-card-title>
              <v-card-text>
                <div class="errorMessage" v-html="error" />
                <v-container>
                  <v-layout wrap>
                    <v-flex xs12 md12>
                      <v-form ref="AddCityForm" v-model="valid" lazy-validation>
                        <v-text-field
                        label="Enter the city name*"
                        v-model="city_name"
                        :rules="cityRules"
                        required></v-text-field>
                          <v-select
                              :items="cities_regions"
                              v-model="city_region"
                              item-text="region_name"
                              item-value="region_id"
                              label="Select city's region"
                              :rules="[(v) => !!v || 'Region is required']"
                              placeholder="Select Region" required
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
                <v-btn color="blue darken-1" flat @click.native="cancel_addCity">Close</v-btn>
                <v-btn color="blue darken-1" :disabled="!valid" flat @click.native="AddCity">Save</v-btn>
              </v-card-actions>
           </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
      <v-layout row my-5>
        <v-flex xs12 md12>
          <v-card>
            <v-card-title>
              Cities where we opearate: ({{cities.length}})
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
              :items="cities"
              class="elevation-0"
              :search="search"
              prev-icon="mdi-menu-left"
              next-icon="mdi-menu-right"
              sort-icon="mdi-menu-down"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.city_name.toUpperCase() }}</td>
                <td class="text-xs-center">{{ props.item.region_name }}</td>
                <td class="justify-center layout px-0">
                  <v-btn icon class="mx-0" @click="editCity(props.item)">
                    <v-icon color="teal">edit</v-icon>
                  </v-btn>
                  <v-btn icon class="mx-0" @click="deleteCity(props.item)">
                    <v-icon color="pink">delete</v-icon>
                  </v-btn>
                </td>
              </template>
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ citySearch }}" found no results.
              </v-alert>
            </v-data-table>
            <v-layout row justify-center>
              <v-dialog v-model="deleteCity_dialog" max-width="400">
                <v-card>
                  <v-card-text>Are you sure you want to delete {{delete_city}}.</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click.native="deleteCity_dialog = false">Cancel</v-btn>
                    <v-btn color="green darken-1" v-show="visible" flat="flat" @click.native="city_delete">Ok</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="editCity_dialog" persistent max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="">Edit City</span>
                  </v-card-title>
                  <v-card-text>
                    <div class="errorMessage" v-html="city_editError" />
                    <v-container fluid>
                      <v-layout wrap>
                        <v-flex xs12 md12>
                          <v-form ref="editCityForm" v-model="cityEdit_valid" lazy-validation>
                            <v-text-field
                            label="City name*"
                            v-model="old_city"
                            :rules="regionRules"
                            required></v-text-field>
                            <v-select
                                :items="cities_regions"
                                v-model="old_region"
                                item-text="region_name"
                                item-value="region_id"
                                label="Select city's region"
                                :rules="[(v) => !!v || 'Region is required']"
                                placeholder="Select Region" required
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
                    <v-btn color="green darken-1" flat="flat"
                       @click.native="cancel_cityEdit">Cancel</v-btn>
                    <v-btn color="green darken-1" :loading="editCity_button" :disabled="cityEdit_valid" flat="flat" @click.native="city_edit">Save</v-btn>
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
        visible: true,
        city_dialog: false,
        editCity_dialog: false,
        deleteCity_dialog: false,
        delete_city: null,
        search: '',
        valid: true,
        city_name: '',
        city_region: null,
        cities_regions: [],
        cityRules: [(v) => !!v || 'City name is required'],
        regionRules: [(v) => !!v || 'Please select a region.'],
        error: null,
        success: null,
        cities: [],
        citySearch: '',
        message_dialog: false,
        message: '',
        cityEdit_valid: false,
        cityEdit_dialog: false,
        messageClass: '',
        old_region: '',
        new_region: '',
        old_city: '',
        new_city: '',
        city_id: null,
        region_id: null,
        city_editError: null,
        editCity_button: false,
        headers: [
          {
            text: 'City Name',
            align: 'left',
            sortable: true,
            value: 'cityName'
          },
          { text: 'Region', value: 'cityRegion', align: 'center' },
          { text: 'Actions', value: 'actions', align: 'center', sortable: false }
        ]
      }
    },
    created () {
      this.Cities()
      this.Regions()
    },
    mounted () {
      this.Cities()
      this.Regions()
    },
    watch: {
      old_city: function (cityname) {
        if (cityname.toUpperCase() === this.new_city && this.old_region === this.new_region) {
          this.cityEdit_valid = true
        } else {
          this.cityEdit_valid = false
        }
      },
      old_region: function (regionID) {
        if (regionID === this.new_region && this.old_city.toUpperCase() === this.new_city) {
          this.cityEdit_valid = true
        } else {
          this.cityEdit_valid = false
        }
      }
    },
    methods: {
      async AddCity () {
        if (this.$refs.AddCityForm.validate()) {
          this.error = ''
          this.success = ''
          const response = await LocalityService.add_city({
            'city_name': this.city_name,
            'region_id': this.city_region
          })
          if (response.data.success === true) {
            this.$refs.AddCityForm.reset()
            this.success = response.data.message
            this.cities = response.data.cities
          } else {
            this.error = response.data.error
          }
        } else {
          this.error = 'City name required.'
        }
      },
      async Cities () {
        const response = await LocalityService.cities()
        this.cities = response.data.cities
      },
      async Regions () {
        const response = await LocalityService.Regions()
        this.cities_regions = response.data.regions
      },
      cancel_addCity () {
        this.success = ''
        this.error = ''
        this.city_dialog = false
      },
      editCity (city) {
        this.old_city = city.city_name.toUpperCase()
        this.new_city = city.city_name.toUpperCase()
        this.old_region = city.region_id
        this.new_region = city.region_id
        this.city_id = city.city_id
        this.editCity_dialog = true
      },
      async city_edit () {
        if (this.$refs.editCityForm.validate()) {
          this.editCity_button = true
          this.city_editError = null
          const response = await LocalityService.edit_city({
            'city_id': this.city_id,
            'city_name': this.old_city,
            'region_id': this.old_region
          })
          if (response) {
            this.editCity_button = false
            if (response.data.success === true) {
              this.editCity_dialog = false
              this.cities = response.data.cities
              this.message = response.data.message
              this.message_dialog = true
            } else {
              if (response.data.error_type === 0) {
                this.city_editError = response.data.error[0]
              } else if (response.data.error_type === 1) {
                this.city_editError = response.data.error
              }
            }
          }
        }
      },
      cancel_cityEdit () {
        this.city_editError = null
        this.editCity_dialog = false
      },
      deleteCity (city) {
        this.delete_city = city.city_name
        this.city_id = city.city_id
        this.region_id = city.region_id
        this.deleteCity_dialog = true
      },
      async city_delete () {
        this.deleteCity_dialog = false
        const response = await LocalityService.delete_city({
          'city_id': this.city_id,
          'region_id': this.region_id
        })
        if (response.data.success === true) {
          this.message = response.data.message
          this.cities = response.data.cities
          this.message_dialog = true
        } else {
          this.error = response.data.error
          console.log('Error: ' + this.error)
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
  .p-btn {
    text-transform: capitalize;
  }
</style>
