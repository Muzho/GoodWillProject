<template>
  <div class="singleProp">
    <app-header></app-header>
    <PropJumbotron :prop_id="propID"></PropJumbotron>
    <v-container mt-3 mb-5 grid-list-md>
      <app-breadcrumb v-bind:items="pages"></app-breadcrumb>
      <v-layout row wrap pa-3>
        <v-flex xs12 sm8 md8 class="pa-2">
          <v-layout row wrap>
            <v-flex xs12 sm10>
              <h2>{{ title }}</h2>
            </v-flex>
            <v-flex xs12 sm2 class="text-xs-left">
              <v-btn color="primary" fab small dark @click.native="showEditPropDialog">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-dialog v-model="editPropDialoge" persistent max-width="600px">
                <v-card>
                  <v-card-title>
                    <h3 class="titleDialog">Edit Property</h3>
                  </v-card-title>
                  <v-card-text>
                    <div class="errorMessage" v-html="error" />
                    <v-container>
                      <v-layout wrap>
                        <v-flex xs12 md12>
                          <v-form ref="editPropForm" v-model="editPropValid" lazy-validation>
                            <v-layout row wrap>
                              <v-flex pa-2 xs12>
                                <v-text-field
                                label="Property Title*"
                                v-model="etitle"
                                :rules="rules.titleRule"
                                placeholder="Enter property title"
                                required></v-text-field>
                              </v-flex>
                              <v-flex pa-2 xs12 sm6>
                                <v-text-field
                                label="Property Address*"
                                v-model="eaddress"
                                :rules="rules.addressRule"
                                placeholder="Enter property address"
                                required></v-text-field>
                              </v-flex>
                              <v-flex pa-2 xs12 sm6>
                                <v-select
                                    :items="PropertyLocations"
                                    v-model="elocation"
                                    item-text="area_name"
                                    item-value="area_id"
                                    label="Property Location Area"
                                    :rules="rules.locationRule"
                                    placeholder="Select" required
                                    cache-items
                                  ></v-select>
                              </v-flex>
                              <v-flex pa-2 xs12 sm6>
                                <v-select
                                    :items="propCategories"
                                    v-model="epropCat"
                                    item-text="category"
                                    item-value="cat_id"
                                    label="Property Category"
                                    :rules="[(v) => !!v || 'Category is required']"
                                    placeholder="Select" required
                                    cache-items
                                  ></v-select>
                              </v-flex>
                              <v-flex pa-2 xs12 sm6>
                                <v-select
                                    :items="propTypes"
                                    v-model="epropType"
                                    item-text="type"
                                    item-value="prop_id"
                                    label="Property Type"
                                    :rules="rules.typeRule"
                                    placeholder="Select" required
                                    cache-items
                                  ></v-select>
                              </v-flex>
                              <v-flex pa-2 xs12>
                                <v-text-field
                                label="Price*"
                                v-model="eprice"
                                :rules="rules.priceRule"
                                :counter="15"
                                suffix="/="
                                placeholder="Enter property price"
                                required></v-text-field>
                              </v-flex>
                              <v-flex pa-2 xs12>
                                <v-textarea
                                label="Enter the property details*"
                                v-model="edetails"
                                :rules="rules.detailsRule"
                                :counter="1000"
                                required></v-textarea>
                              </v-flex>
                            </v-layout>
                          </v-form>
                        </v-flex>
                      </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="closeEditPropDialog">Close</v-btn>
                    <v-btn
                      color="blue darken-1"
                      :disabled="editPropValid"
                      flat
                      :loading="loading"
                      @click.native="editProperty">Save</v-btn>
                  </v-card-actions>
               </v-card>
              </v-dialog>
              <v-dialog v-model="message_dialog" max-width="400">
                <v-card>
                  <v-card-text :class="messageClass">{{ editResponse }}</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click.native="message_dialog = false">OK</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-flex>
          </v-layout>
          <p>
            <v-icon>place</v-icon>
            <span class="ml-1">{{ address}}, {{ location }}</span>
          </p>
          <p class="mt-0">
            <span :class="propCat">For {{ propCat }}</span>
          </p>
          <p class="mt-0">
            <span :class="propType">{{ propType }}</span>
          </p>
          <p class="mt-0 mb-4">
            <span>Ugx. {{ price }}</span>
          </p>
          <PropDesc :propDesc="propDesc"></PropDesc>
          <hr class="mx-1 my-3">
          <PropFeatures :prop_id="propID"></PropFeatures>
          <hr class="mx-1 my-3">
          <PropNei :propNei="propNei"></PropNei>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <PropViews :prop_id="propID"></PropViews>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import singlePropService from '@/Services/singleProp'
  import WhenNeededService from '@/Services/WhenNeededService'
  import LocalityService from '@/Services/LocalityServices'
  import PropJumbotron from './PropComponents/PropJumbotron'
  import PropDesc from './PropComponents/PropDesc'
  import PropFeatures from './PropComponents/PropFeatures'
  import PropNei from './PropComponents/PropNei'
  import PropViews from './PropComponents/PropViews'
  export default {
    components: {
      'PropJumbotron': PropJumbotron,
      'PropDesc': PropDesc,
      'PropFeatures': PropFeatures,
      'PropNei': PropNei,
      'PropViews': PropViews
    },
    data () {
      return {
        propID: this.$route.params.propID,
        pages: [
          {
            text: 'Home',
            pageUrl: '/Dashboard',
            disabled: false
          },
          {
            text: 'GoodWill Properties',
            pageUrl: '/Land',
            disabled: false
          },
          {
            text: 'Single Property',
            pageUrl: '/SingleProp/:this.propID',
            disabled: false
          }
        ],
        img: '',
        title: null,
        propDesc: '',
        address: '',
        location: '',
        propType: '',
        propCat: '',
        price: '',
        catID: null,
        typeID: null,
        locID: null,
        propNei: [],
        editPropDialoge: false,
        editPropValid: true,
        etitle: '',
        edetails: '',
        eaddress: '',
        elocation: '',
        epropType: '',
        epropCat: '',
        eprice: '',
        oldProp: {
          title: '',
          details: '',
          address: '',
          location: '',
          propType: '',
          propCat: '',
          price: ''
        },
        propCategories: [],
        propTypes: [],
        PropertyLocations: [],
        error: null,
        editResponse: '',
        messageClass: '',
        message_dialog: false,
        loading: false,
        rules: {
          titleRule: [v => !!v || 'Title required', v => !!v && (v.length <= 50 || 'This field should not be more than 50 Characters')],
          addressRule: [v => !!v || 'Address required', v => !!v && (v.length <= 150 || 'This field should not be more than 150 Characters')],
          priceRule: [(v) => !!v || 'Property price required',
            (v) => /^[0-9]+$/.test(v) || 'Use digits only'],
          detailsRule: [v => !!v || 'Property details required', v => !!v && (v.length <= 5000 || 'This field should not be more than 5000 Characters')],
          categoryRule: [(v) => !!v || 'Category required'],
          typeRule: [(v) => !!v || 'Category required'],
          locationRule: [(v) => !!v || 'Location required']
        }
      }
    },
    watch: {
      etitle (title) {
        if (title.toUpperCase() === this.oldProp.title &&
            this.eaddress.toUpperCase() === this.oldProp.address &&
            this.elocation === this.oldProp.location &&
            this.epropCat === this.oldProp.propCat &&
            this.epropType === this.oldProp.propType &&
            this.eprice.toString() === this.oldProp.price &&
            this.edetails.toUpperCase() === this.oldProp.details) {
          this.editPropValid = true
        } else {
          this.editPropValid = false
        }
      },
      eaddress (address) {
        if (address.toUpperCase() === this.oldProp.address &&
            this.etitle.toUpperCase() === this.oldProp.title &&
            this.elocation === this.oldProp.location &&
            this.epropCat === this.oldProp.propCat &&
            this.epropType === this.oldProp.propType &&
            this.eprice.toString() === this.oldProp.price &&
            this.edetails.toUpperCase() === this.oldProp.details) {
          this.editPropValid = true
        } else {
          this.editPropValid = false
        }
      },
      elocation (location) {
        if (location === this.oldProp.location &&
            this.etitle.toUpperCase() === this.oldProp.title &&
            this.eaddress.toUpperCase() === this.oldProp.address &&
            this.epropCat === this.oldProp.propCat &&
            this.epropType === this.oldProp.propType &&
            this.eprice.toString() === this.oldProp.price &&
            this.edetails.toUpperCase() === this.oldProp.details) {
          this.editPropValid = true
        } else {
          this.editPropValid = false
        }
      },
      epropCat (propCat) {
        if (propCat === this.oldProp.propCat &&
            this.etitle.toUpperCase() === this.oldProp.title &&
            this.eaddress.toUpperCase() === this.oldProp.address &&
            this.elocation === this.oldProp.location &&
            this.epropType === this.oldProp.propType &&
            this.eprice.toString() === this.oldProp.price &&
            this.edetails.toUpperCase() === this.oldProp.details) {
          this.editPropValid = true
        } else {
          this.editPropValid = false
        }
      },
      epropType (propType) {
        if (propType === this.oldProp.propType &&
            this.etitle.toUpperCase() === this.oldProp.title &&
            this.eaddress.toUpperCase() === this.oldProp.address &&
            this.elocation === this.oldProp.location &&
            this.epropCat === this.oldProp.propCat &&
            this.eprice.toString() === this.oldProp.price &&
            this.edetails.toUpperCase() === this.oldProp.details) {
          this.editPropValid = true
        } else {
          this.editPropValid = false
        }
      },
      eprice (price) {
        if (price.toString() === this.oldProp.price &&
            this.etitle.toUpperCase() === this.oldProp.title &&
            this.eaddress.toUpperCase() === this.oldProp.address &&
            this.elocation === this.oldProp.location &&
            this.epropType === this.oldProp.propType &&
            this.epropCat === this.oldProp.propCat &&
            this.edetails.toUpperCase() === this.oldProp.details) {
          this.editPropValid = true
        } else {
          this.editPropValid = false
        }
      },
      edetails (details) {
        if (details.toUpperCase() === this.oldProp.propCat &&
            this.etitle.toUpperCase() === this.oldProp.title &&
            this.eaddress === this.oldProp.address &&
            this.elocation === this.oldProp.location &&
            this.epropType === this.oldProp.propType &&
            this.eprice.toString() === this.oldProp.price &&
            this.epropCat === this.oldProp.propCat) {
          this.editPropValid = true
        } else {
          this.editPropValid = false
        }
      }
    },
    created () {
      this.property()
      this.PropertyCategories()
      this.PropertyTypes()
      this.Areas()
    },
    mounted () {
      this.property()
      this.PropertyCategories()
      this.PropertyTypes()
      this.Areas()
    },
    methods: {
      async PropertyCategories () {
        const response = await WhenNeededService.PropertyCategories()
        this.propCategories = response.data.property_categories
      },
      async PropertyTypes () {
        const response = await WhenNeededService.PropertyTypes()
        this.propTypes = response.data.property_types
      },
      async Areas () {
        const response = await LocalityService.areas()
        this.PropertyLocations = response.data.areas
      },
      async property () {
        try {
          const response = await singlePropService.property({
            propID: this.propID
          })

          if (response.data.success === true) {
            this.propSep(response.data.property)
          } else if (response.data.success === false) {
            console.log(response.data.error)
          }
        } catch (error) {
          console.log(error)
        }
      },
      propSep (property) {
        this.img = property.img
        this.title = property.title
        this.propDesc = property.details
        this.price = property.price
        this.address = property.address
        this.location = property.location
        this.propType = property.type
        this.propCat = property.category
        this.locID = property.locationID
        this.catID = property.categoryID
        this.typeID = property.typeID
      },
      showEditPropDialog () {
        this.etitle = this.title
        this.oldProp.title = this.title.toUpperCase()
        this.eaddress = this.address
        this.oldProp.address = this.address.toUpperCase()
        this.elocation = this.locID
        this.oldProp.location = this.locID
        this.epropCat = this.catID
        this.oldProp.propCat = this.catID
        this.epropType = this.typeID
        this.oldProp.propType = this.typeID
        this.eprice = this.price.toString()
        this.oldProp.price = this.price.toString()
        this.edetails = this.propDesc
        this.oldProp.details = this.propDesc.toUpperCase()
        this.editPropDialoge = true
      },
      closeEditPropDialog () {
        this.error = null
        this.editPropDialoge = false
      },
      async editProperty () {
        this.error = null
        this.loading = true
        try {
          const response = await singlePropService.editProperty({
            title: this.etitle,
            address: this.eaddress,
            details: this.edetails,
            propType: this.epropType,
            category: this.epropCat,
            location: this.elocation,
            price: this.eprice,
            propID: this.propID
          })

          if (response) {
            this.loading = false

            if (response.data.success === true) {
              this.editPropDialoge = false
              this.editResponse = response.data.message
              this.messageClass = 'success'
              this.message_dialog = true
              this.propSep(response.data.property)
            } else if (response.data.success === false) {
              if (response.data.error_type === 0) {
                this.error = response.data.error[0]
              } else if (response.data.error_type === 1) {
                this.error = response.data.error
              } else {
                this.error = 'Error !!!'
              }
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
  .Sale {
    color: #FF5722;
  }
  .Rent {
    color: #0091EA;
  }
  .NewDevelopment {
    color: #00BFA5;
  }
  /* .success {
    color: #00C853;
  } */
</style>
