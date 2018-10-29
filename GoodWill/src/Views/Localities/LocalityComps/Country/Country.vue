<template>
  <v-card class="py-5 px-4">
    <v-container>
      <v-layout row justify-center>
        <v-flex xs12 md12>
          <v-dialog v-model="dialog" persistent max-width="500px">
            <v-btn round slot="activator" class="p-btn" color="primary" dark>
              <v-icon dark left>control_point</v-icon>
              Add Country
            </v-btn>
            <v-card>
              <v-card-title>
                <span class="">Add Country</span>
              </v-card-title>
              <v-card-text>
                <div class="errorMessage" v-html="error" />
                <v-container>
                  <v-layout wrap>
                    <v-flex xs12 md12>
                      <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field
                        label="Enter the country name*"
                        v-model="country_name"
                        :rules="nameRules"
                        required></v-text-field>
                        <v-text-field
                        label="Enter the country short name*"
                        v-model="country_shortname"
                        :rules="shortnameRules"
                        hint="e.g. UG, TZ, USA"
                        persistent-hint
                        required></v-text-field>
                      </v-form>
                    </v-flex>
                  </v-layout>
                  <div class="successMessage mt-2" v-html="success" />
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" :disabled="!valid" flat @click.native="AddCountry">Save</v-btn>
              </v-card-actions>
           </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
      <v-layout row my-5>
        <v-flex xs12 md12>
          <!-- <CountriesDataTable :countries="countries"></CountriesDataTable> -->
          <v-card>
            <v-card-title>
              Countries where we operate: ({{countries.length}})
              <v-spacer></v-spacer>
              <v-text-field
                v-model="country_search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="countries"
              class="elevation-0"
              :search="country_search"
              prev-icon="mdi-menu-left"
              next-icon="mdi-menu-right"
              sort-icon="mdi-menu-down"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.CountryName }}</td>
                <td class="text-xs-center">{{ props.item.CountryShortName }}</td>
                <td class="justify-center layout px-0">
                  <v-btn icon class="mx-0" @click="editCountry(props.item)">
                    <v-icon color="teal">edit</v-icon>
                  </v-btn>
                  <v-btn icon class="mx-0" @click.native.stop="deletePop(props.item)">
                    <v-icon color="pink">delete</v-icon>
                  </v-btn>
                </td>
              </template>
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ country_search }}" found no results.
              </v-alert>
            </v-data-table>
            <v-layout row justify-center>
              <v-dialog v-model="delete_dialog" max-width="400">
                <v-card>
                  <v-card-text>Are you sure you want to delete {{country_delete}}.</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click.native="delete_dialog = false">Cancel</v-btn>
                    <v-btn color="green darken-1" v-show="visible" flat="flat" @click.native="deleteCountry">Ok</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="edit_dialog" persistent max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="">Edit Country</span>
                  </v-card-title>
                  <v-card-text>
                    <div class="errorMessage" v-html="edit_error" />
                    <v-container fluid>
                      <v-layout wrap>
                        <v-flex xs12 md12>
                          <v-form ref="editForm" v-model="edit_valid" lazy-validation>
                            <v-text-field
                            label="Country name*"
                            v-model="old_countryName"
                            :rules="nameRules"
                            required></v-text-field>
                            <v-text-field
                            label="Country short name*"
                            v-model="old_shortName"
                            :rules="shortnameRules"
                            hint="e.g. UG, TZ, USA"
                            persistent-hint
                            required></v-text-field>
                          </v-form>
                        </v-flex>
                      </v-layout>
                      <div class="successMessage mt-2" v-html="success" />
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click.native="edit_dialog = false">Cancel</v-btn>
                    <v-btn color="green darken-1" :disabled="edit_valid" flat="flat" @click.native="edit_country">Save</v-btn>
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
        dialog: false,
        valid: true,
        edit_valid: true,
        country_name: '',
        country_shortname: '',
        old_countryName: '',
        new_countryName: '',
        old_shortName: '',
        new_shortName: '',
        nameRules: [(v) => !!v || 'Country name is required'],
        shortnameRules: [(v) => !!v || 'Short country name is required'],
        error: null,
        edit_error: null,
        edit_success: '',
        success: null,
        countries: [],
        visible: true,
        messageClass: null,
        message: null,
        delete_dialog: false,
        message_dialog: false,
        edit_dialog: false,
        country_delete: null,
        country_id: null,
        country_search: '',
        refresh_countries: this.countries,
        headers: [
          {
            text: 'Country Name',
            align: 'left',
            sortable: true,
            value: 'country_name'
          },
          { text: 'Country Short Name', value: 'csn', align: 'center', sortable: false },
          { text: 'Actions', value: 'actions', align: 'center', sortable: false }
        ]
      }
    },
    created () {
      this.Countries()
    },
    mounted () {
      this.Countries()
    },
    watch: {
      old_countryName: function (countryName) {
        if (countryName.toUpperCase() === this.new_countryName) {
          this.edit_valid = true
        } else {
          this.edit_valid = false
        }
      },
      old_shortName: function (shortName) {
        if (shortName.toUpperCase() === this.new_shortName) {
          this.edit_valid = true
        } else {
          this.edit_valid = false
        }
      }
    },
    methods: {
      async AddCountry () {
        this.error = ''
        this.success = ''
        if (this.$refs.form.validate()) {
          const response = await LocalityService.AddCountry({
            'country_name': this.country_name,
            'country_shortname': this.country_shortname
          })
          if (response.data.success === true) {
            this.$refs.form.reset()
            this.success = response.data.message
            this.countries = response.data.countries
          } else {
            this.error = response.data.error
          }
        } else {
          this.error = 'Country name required.'
        }
      },
      async Countries () {
        const response = await LocalityService.Countries()
        this.countries = response.data.countries
      },
      editCountry (country) {
        this.country_id = country.Country_Id
        this.old_countryName = country.CountryName.toUpperCase()
        this.new_countryName = country.CountryName.toUpperCase()
        this.old_shortName = country.CountryShortName.toUpperCase()
        this.new_shortName = country.CountryShortName.toUpperCase()
        this.edit_dialog = true
      },
      async edit_country () {
        this.edit_error = ''
        this.message = ''
        if (this.$refs.editForm.validate()) {
          const response = await LocalityService.edit_country({
            'country_name': this.old_countryName,
            'country_shortname': this.old_shortName,
            'country_id': this.country_id
          })
          if (response.data.success === true) {
            this.countries = response.data.countries
            this.message = response.data.message
            this.edit_dialog = false
            this.message_dialog = true
          } else {
            this.edit_error = response.data.error
          }
        } else {
          this.error = 'Country name and short name required.'
        }
      },
      deletePop (country) {
        this.delete_dialog = true
        this.country_delete = country.CountryName
        this.country_id = country.Country_Id
      },
      async deleteCountry () {
        this.delete_dialog = false
        const response = await LocalityService.delete_country({
          country_id: this.country_id
        })
        if (response.data.success === true) {
          this.countries = response.data.countries
          this.message = response.data.message
          this.message_dialog = true
        } else if (response.data.success === false) {
          console.log(response.data.message)
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
