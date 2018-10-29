<template>
  <v-card class="py-5 px-4">
    <v-container>
      <v-layout row justify-center>
        <v-flex xs12 md12>
          <v-dialog v-model="add_region_dialog" persistent max-width="500px">
            <v-btn round slot="activator" class="p-btn" color="primary" dark>
              <v-icon dark left>my_location</v-icon>
              Add Region
            </v-btn>
            <v-card>
              <v-card-title>
                <span class="">Add Region</span>
              </v-card-title>
              <v-card-text>
                <div class="errorMessage" v-html="error" />
                <v-container>
                  <v-layout wrap>
                    <v-flex xs12 md12>
                      <v-form ref="region_form" v-model="valid" lazy-validation>
                        <v-text-field
                        label="Enter the region name*"
                        v-model="region_name"
                        :rules="regionRules"
                        required></v-text-field>
                        <v-select
                            :items="countries_region"
                            v-model="RegionCountry"
                            item-text="CountryName"
                            item-value="Country_Id"
                            label="Select region's country"
                            :rules="[(v) => !!v || 'Country is required']"
                            placeholder="Select Country" required
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
                <v-btn color="blue darken-1" flat @click.native="cancel_addRegion">Close</v-btn>
                <v-btn color="blue darken-1" :disabled="!valid" flat @click.native="AddRegion">Save</v-btn>
              </v-card-actions>
           </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
      <v-layout row my-5>
        <v-flex xs12 md12>
          <v-card>
            <v-card-title>
              Regions where we opearate: ({{regions.length}})
              <v-spacer></v-spacer>
              <v-text-field
                v-model="regionSearch"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="regions"
              class="elevation-0"
              :search="search"
              prev-icon="mdi-menu-left"
              next-icon="mdi-menu-right"
              sort-icon="mdi-menu-down"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.region_name }}</td>
                <td class="text-xs-center">{{ props.item.country }}</td>
                <td class="justify-center layout px-0">
                  <v-btn icon class="mx-0" @click="editRegion(props.item)">
                    <v-icon color="teal">edit</v-icon>
                  </v-btn>
                  <v-btn icon class="mx-0" @click="deleteRegion(props.item)">
                    <v-icon color="pink">delete</v-icon>
                  </v-btn>
                </td>
              </template>
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ regionSearch }}" found no results.
              </v-alert>
            </v-data-table>
            <v-layout row justify-center>
              <v-dialog v-model="delete_dialog" max-width="400">
                <v-card>
                  <v-card-text>Are you sure you want to delete {{delete_region}}.</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click.native="delete_dialog = false">Cancel</v-btn>
                    <v-btn color="green darken-1" v-show="visible" flat="flat" @click.native="region_delete">Ok</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="edit_regionDialog" persistent max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="">Edit Region</span>
                  </v-card-title>
                  <v-card-text>
                    <div class="errorMessage" v-html="edit_regionError" />
                    <v-container fluid>
                      <v-layout wrap>
                        <v-flex xs12 md12>
                          <v-form ref="editRegionForm" v-model="edit_regionValid" lazy-validation>
                            <v-text-field
                            label="Region name*"
                            v-model="old_region"
                            :rules="regionRules"
                            required></v-text-field>
                            <v-select
                                :items="countries_region"
                                v-model="old_country"
                                item-text="CountryName"
                                item-value="Country_Id"
                                label="Select region's country"
                                :rules="[(v) => !!v || 'Country is required']"
                                placeholder="Select Country" required
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
                    <v-btn color="green darken-1" flat="flat" @click.native="cancel_regionEdit">Cancel</v-btn>
                    <v-btn color="green darken-1" :loading="editRegion_button" :disabled="edit_regionValid" flat="flat" @click.native="region_edit">Save</v-btn>
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
        add_region_dialog: false,
        valid: true,
        region_name: '',
        RegionCountry: null,
        countries_region: [],
        editRegion_button: false,
        old_region: '',
        old_country: '',
        new_region: '',
        new_country: '',
        message_dialog: false,
        message: null,
        edit_regionDialog: false,
        delete_dialog: false,
        messageClass: null,
        country_id: null,
        region_id: null,
        edit_regionError: null,
        visible: true,
        delete_region: null,
        edit_regionValid: false,
        regionRules: [(v) => !!v || 'Region name is required'],
        countryRules: [(v) => !!v || 'Please select a country.'],
        error: null,
        success: null,
        regions: [],
        regionSearch: '',
        search: '',
        headers: [
          {
            text: 'Region',
            align: 'left',
            sortable: true,
            value: 'regionName'
          },
          { text: 'Country', value: 'regionCountry', align: 'center' },
          { text: 'Actions', value: 'actions', align: 'center', sortable: false }
        ]
      }
    },
    created () {
      this.Regions()
      this.Region_Countries()
    },
    mounted () {
      this.Regions()
      this.Region_Countries()
    },
    watch: {
      old_region: function (regionname) {
        if (regionname.toUpperCase() === this.new_region && this.old_country === this.country_id) {
          this.edit_regionValid = true
        } else {
          this.edit_regionValid = false
        }
      },
      old_country: function (countryID) {
        if (countryID === this.country_id && this.old_region.toUpperCase() === this.new_region) {
          this.edit_regionValid = true
        } else {
          this.edit_regionValid = false
        }
      }
    },
    methods: {
      async Region_Countries () {
        const response = await LocalityService.Countries()
        this.countries_region = response.data.countries
      },
      async AddRegion () {
        if (this.$refs.region_form.validate()) {
          this.error = ''
          this.success = ''
          const response = await LocalityService.add_region({
            'region_name': this.region_name,
            'country_id': this.RegionCountry
          })

          if (response.data.success === true) {
            this.$refs.region_form.reset()
            this.success = response.data.message
            this.regions = response.data.regions
          } else {
            this.error = response.data.error
          }
        } else {
          this.error = 'Region name required.'
        }
      },
      cancel_addRegion () {
        this.success = null
        this.error = null
        this.add_region_dialog = false
      },
      async Regions () {
        const response = await LocalityService.Regions()
        this.regions = response.data.regions
      },
      editRegion (region) {
        this.old_region = region.region_name.toUpperCase()
        this.new_region = region.region_name.toUpperCase()
        this.old_country = region.country_id
        this.region_id = region.region_id
        this.country_id = region.country_id
        this.edit_regionDialog = true
      },
      cancel_regionEdit () {
        this.edit_regionError = null
        this.edit_regionDialog = false
      },
      deleteRegion (region) {
        this.region_id = region.region_id
        this.country_id = region.country_id
        this.delete_region = region.region_name
        this.delete_dialog = true
      },
      async region_edit () {
        if (this.$refs.editRegionForm.validate()) {
          this.editRegion_button = true
          this.edit_regionError = null
          const response = await LocalityService.edit_region({
            'region_id': this.region_id,
            'region_name': this.old_region,
            'country_id': this.old_country
          })
          if (response) {
            this.editRegion_button = false
            if (response.data.success === true) {
              this.edit_regionDialog = false
              this.regions = response.data.regions
              this.message = response.data.message
              this.message_dialog = true
            } else {
              if (response.data.error_type === 0) {
                this.edit_regionError = response.data.error[0]
              } else if (response.data.error_type === 1) {
                this.edit_regionError = response.data.error
              }
            }
          }
        }
      },
      async region_delete () {
        const response = await LocalityService.delete_region({
          country_id: this.country_id,
          region_id: this.region_id
        })

        if (response.data.success === true) {
          this.regions = response.data.regions
          this.message = response.data.message
          this.delete_dialog = false
          this.message_dialog = true
        } else {
          this.message = response.data.error
          this.message_dialog = true
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
