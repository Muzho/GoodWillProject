<template>
  <div class="mainDiv">
    <app-header></app-header>
    <v-container fluid mb-5>
      <v-layout row wrap>
        <v-flex xs12 sm12 md3 lg3 xl3>
          <v-container>
            <v-layout pa-3>
              <v-flex sm12>
                <landstats
                  :properties="laProperties.length"
                  :forRent="forRent"
                  :forSale="forSale"
                  :apartments="apartments"
                  :houses="houses"
                  :offices="offices"
                  :spaceToLet="spaceToLet"
                  :lands="lands"
                  :wareHouses="wareHouses"
                  ></landstats>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs12 sm12 md9 lg9 xl9 class="px-4">
          <v-slide-y-transition mode="out-in">
            <v-container>
              <v-layout row wrap>
                <v-flex xs12>
                  <h1 class="primary--text mt-5 ml-2">{{page_title}}</h1>
                  <app-breadcrumb v-bind:items="pages"></app-breadcrumb>
                </v-flex>
              </v-layout>
            </v-container>
          </v-slide-y-transition>
          <v-container>
            <v-layout row wrap mt-4>
              <v-flex xs12 sm8 md8></v-flex>
              <v-flex xs12 sm4 md4 class="text-md-right text-sm-right">
                <v-dialog v-model="add_landDialog" persistent max-width="800px">
                  <v-btn round slot="activator" class="p-btn" color="primary" dark>
                    <!-- <v-icon dark left>control_point</v-icon> -->
                    Add Land Property
                  </v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="cardTitle">Add Land Property</span>
                    </v-card-title>
                    <v-card-text>
                      <div class="errorMessage my-3" v-html="addLand_error" />
                      <v-container>
                        <v-layout wrap>
                          <v-flex xs12 md12>
                            <v-form enctype="multipart/form-data" ref="LandForm" v-model="land_valid" lazy-validation>
                              <v-stepper v-model="e1">
                                <v-stepper-header>
                                  <v-stepper-step :complete="e1 > 1" step="1">About the property</v-stepper-step>
                                  <v-divider></v-divider>
                                  <v-stepper-step :complete="e1 > 2" step="2">Features and Facilities</v-stepper-step>
                                  <v-divider></v-divider>
                                  <v-stepper-step step="3">Property Images</v-stepper-step>
                                </v-stepper-header>
                                <v-stepper-items>
                                  <v-stepper-content step="1">
                                    <v-layout my-4 row wrap>
                                      <v-flex class="mb-3" xs12>
                                        <v-text-field
                                        label="Title"
                                        v-model="PropertyForm.title"
                                        :rules="rules.titleRule"
                                        :counter="50"
                                        required></v-text-field>
                                      </v-flex>
                                      <v-flex class="mb-3" xs12>
                                        <v-select
                                            :items="propTypes"
                                            v-model="PropertyForm.propType"
                                            item-text="type"
                                            item-value="prop_id"
                                            label="Select Property Type"
                                            :rules="rules.typeRule"
                                            placeholder="Select property type"
                                            cache-items
                                          ></v-select>
                                      </v-flex>
                                      <v-flex class="mb-3" xs12>
                                        <v-select
                                            :items="propCategories"
                                            v-model="PropertyForm.propCategory"
                                            item-text="category"
                                            item-value="cat_id"
                                            label="Select Property Category"
                                            :rules="rules.categoryRule"
                                            placeholder="Select category"
                                            cache-items
                                          ></v-select>
                                      </v-flex>
                                      <v-flex class="mb-3" xs12>
                                        <v-autocomplete
                                            :items="areas"
                                            v-model="PropertyForm.propLocation"
                                            item-text="area_name"
                                            item-value="area_id"
                                            label="Select Property Location"
                                            :rules="rules.locationRule"
                                            placeholder="Select area"
                                            cache-items
                                          ></v-autocomplete>
                                      </v-flex>
                                      <v-flex class="mb-3" xs12>
                                        <v-text-field
                                        label="Property Address"
                                        v-model="PropertyForm.address"
                                        :rules="rules.addressRule"
                                        :counter="150"
                                        required></v-text-field>
                                      </v-flex>
                                      <v-flex class="mb-3" xs12>
                                        <v-autocomplete
                                            :items="owners"
                                            v-model="PropertyForm.propOwner"
                                            item-text="name"
                                            item-value="owner_id"
                                            label="Select Property Owner"
                                            :rules="rules.ownerRule"
                                            placeholder="Select owner"
                                            :filter="customFilter"
                                            cache-items
                                          ></v-autocomplete>
                                      </v-flex>
                                      <v-flex class="mb-3" xs12>
                                        <v-text-field
                                        label="Property Price"
                                        v-model="PropertyForm.price"
                                        :rules="rules.priceRule"
                                        :counter="15"
                                        suffix="/="
                                        type="number"
                                        required></v-text-field>
                                      </v-flex>
                                      <v-flex class="mb-3" xs12>
                                        <v-textarea
                                        label="Details"
                                        v-model="PropertyForm.details"
                                        :rules="rules.detailsRule"
                                        :counter="5000"
                                        required></v-textarea>
                                      </v-flex>
                                    </v-layout>
                                    <v-btn id="formBtn" round color="primary" @click.native="e1 = 2">
                                      Continue
                                      <v-icon dark right>keyboard_arrow_right</v-icon>
                                    </v-btn>
                                  </v-stepper-content>
                                  <v-stepper-content step="2">
                                    <v-layout my-4 row wrap>
                                      <v-flex xs12>
                                        <h3>Features</h3>
                                        <v-combobox
                                            multiple
                                            :items="features"
                                            v-model="PropertyForm.propFeatures"
                                            item-text="feature"
                                            item-value="feature_id"
                                            label="Select Property Features"
                                            :rules="rules.featureRule"
                                            placeholder="Select features"
                                            chips
                                            tags
                                            cache-items
                                          ></v-combobox>
                                      </v-flex>
                                      <v-flex xs12 class="mt-4">
                                        <h3>Facilities</h3>
                                        <v-combobox
                                            multiple
                                            :items="facilities"
                                            v-model="PropertyForm.propFacilities"
                                            item-text="facility"
                                            item-value="facility_id"
                                            label="Select Property Facilities"
                                            placeholder="Select facilities"
                                            chips
                                            tags
                                            cache-items
                                          ></v-combobox>
                                      </v-flex>
                                    </v-layout>
                                    <v-btn round dark id="formBtn" color="secondary" @click.native="e1 = 1">
                                      <v-icon dark left>keyboard_arrow_left</v-icon>
                                      Previous
                                    </v-btn>
                                    <v-btn round id="formBtn" dark color="primary" @click.native="e1 = 3">
                                      Next
                                      <v-icon dark right>keyboard_arrow_right</v-icon>
                                    </v-btn>
                                  </v-stepper-content>
                                  <v-stepper-content step="3">
                                    <v-layout my-4 row wrap>
                                      <v-flex xs12>
                                        <v-layout row wrap>
                                          <v-flex xs12 sm4 md4>
                                            <input type="file" id="propImg" ref="propertyImage" accept="image/*" v-on:change="handleFileUpload"/>
                                          </v-flex>
                                          <v-flex xs12 sm4 md3 v-show="showPreview">
                                            <!-- <v-card>
                                              <v-card-media
                                                :src="imagePreview.propImg"
                                                height="180px"
                                              ></v-card-media>
                                            </v-card> -->
                                          </v-flex>
                                        </v-layout>
                                      </v-flex>
                                      <v-flex xs12 class="mt-4">
                                        <h4>Other Image(s) if any ...</h4>
                                        <v-layout row wrap>
                                          <v-flex xs12 sm4 md4>
                                            <label>Files
                                              <input type="file"
                                               id="files" ref="files"
                                               accept="image/*"
                                               multiple v-on:change="handleMultiFileUploads"/>
                                            </label>
                                          </v-flex>
                                          <v-flex xs12 sm4 md3 v-show="showMultiPreview">
                                            <v-card>
                                              <!-- <v-card-media
                                                :src="imagePreview.propImg"
                                                height="180px"
                                              ></v-card-media> -->
                                            </v-card>
                                          </v-flex>
                                        </v-layout>
                                      </v-flex>
                                    </v-layout>
                                    <v-btn round dark id="formBtn" color="secondary" @click.native="e1 = 2">
                                      <v-icon dark left>keyboard_arrow_left</v-icon>
                                      Previous
                                    </v-btn>
                                    <v-btn
                                      round
                                      id="formBtn"
                                      color="primary"
                                      :disabled="!land_valid"
                                      :loading="loading"
                                      @click.native="AddLand">Add Property</v-btn>
                                  </v-stepper-content>
                                </v-stepper-items>
                              </v-stepper>
                            </v-form>
                          </v-flex>
                        </v-layout>
                        <div class="successMessage mt-2" v-html="success" />
                      </v-container>
                      <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" flat @click.native="cancel_addLand">Cancel</v-btn>
                    </v-card-actions>
                 </v-card>
                </v-dialog>
              </v-flex>

              <v-flex xs12 class="mt-5" v-if="laProperties.length > 0">
                <!-- <propSwiper :propTypes="propTypes"></propSwiper> -->
                <!-- <swiper :options="swiperOption">
                  <!- slides ->
                  <swiper-slide v-for="propType in propTypes" :key="propType.prop_id">
                    <!- <propCarousel :title="propType.type"></propCarousel> ->
                    <v-layout row wrap>
                      <v-flex xs6 sm2>
                        <h3>propType.type</h3>
                      </v-flex>
                    </v-layout>
                  </swiper-slide> ->

                  <!- Optional controls -->
                  <!-- <div class="swiper-pagination"  slot="pagination"></div> ->
                  <div class="swiper-button-prev" slot="button-prev"></div>
                  <div class="swiper-button-next" slot="button-next"></div>
                </swiper> -->
                <v-layout row wrap mb-4>
                  <v-flex xs12 mb-3>
                    <h3>Sort By:</h3>
                  </v-flex>
                  <v-flex pa-2 xs12 sm3 md3>
                    <v-select
                        :items="propCategories"
                        v-model="sortCategory"
                        item-text="category"
                        item-value="category"
                        label="Category"
                        placeholder="Select category"
                        cache-items
                      ></v-select>
                  </v-flex>
                  <v-flex pa-2 xs12 sm3 md3>
                    <v-select
                        :items="propTypes"
                        v-model="sortType"
                        item-text="type"
                        item-value="type"
                        label="Type"
                        placeholder="Select Type"
                        cache-items
                      ></v-select>
                  </v-flex>
                  <v-flex pa-2 xs12 sm3 md3>
                    <v-autocomplete
                        :items="areas"
                        v-model="sortLocation"
                        item-text="area_name"
                        item-value="area_name"
                        label="Location"
                        placeholder="Select area"
                        cache-items
                      ></v-autocomplete>
                  </v-flex>
                  <v-flex pa-2 x12 sm2 md2>
                    <v-btn color="primary" dark class="propBtn"
                      @click.native="resetSort"
                      :disabled="btnDisabled">
                      Reset Sort
                    </v-btn>
                  </v-flex>
                  <v-flex xs12 pa-2>
                    <v-text-field
                      v-model="search"
                      append-icon="search"
                      label="Search"
                      single-line
                      hide-details
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap v-if="properties.length > 0">
                  <v-flex
                    pa-2 xs12 sm4 md3
                    v-for="property in properties"
                    :key="property.prop_id">
                    <v-card height="100%" hover>
                      <v-img :src="property.img" height="200px"></v-img>
                      <v-card-text class="pt-3 pb-0">
                        <span :class="property.type">{{ property.type }}</span> .
                        <span :class="property.category">For {{ property.category }}</span>
                      </v-card-text>
                      <v-card-title class="pt-0 pb-0" primary-title>
                        <h4>{{ property.title }}</h4>
                      </v-card-title>
                      <v-card-text class="pt-0 pb-0">
                        Ugx. {{ property.price }}
                      </v-card-text>
                      <v-card-text class="pt-0">
                        {{ property.location }}
                      </v-card-text>
                      <v-card-actions>
                        <v-btn small dark class="propBtn"
                        color="red"
                        @click.native="deleteProperty(property)">
                          Delete
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn small dark class="propBtn"
                          color="primary"
                          v-bind:to="{path: '/SingleProp/' + property.prop_id}" exact>
                          View
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-flex>
                </v-layout>
                <v-layout v-else>
                  <v-flex xs12 pt-5 class="text-xs-center">
                    No search found ...
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 v-else class="text-xs-center">
                <p class="pt-5">No properties added yet.</p>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
      <v-layout row justify-center>
        <v-dialog v-model="deleteProp_dialog" max-width="400">
          <v-card>
            <v-card-text>Are you sure you want to delete {{delete_prop}}.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat="flat" @click.native="deleteProp_dialog = false">Cancel</v-btn>
              <v-btn color="green darken-1" flat="flat" @click.native="prop_delete">Ok</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import FeatureFacilityService from '@/Services/FeatureFacilityService'
  import WhenNeededService from '@/Services/WhenNeededService'
  import LocalityService from '@/Services/LocalityServices'
  import OwnershipService from '@/Services/OwnershipService'
  import LandService from '@/Services/LandService'
  import imgUploadService from '@/Services/img_uploadService'
  import landstats from './LandsComponents/LandStats'
  import propCarousel from './LandsComponents/PropCarousel'
  import propSwiper from './LandsComponents/PropSwiper'
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    components: {
      'landstats': landstats,
      'propCarousel': propCarousel,
      'propSwiper': propSwiper,
      swiper,
      swiperSlide
    },
    data () {
      return {
        page_title: 'GoodWill Properties',
        pages: [
          {
            text: 'Home',
            pageUrl: '/Dashboard',
            disabled: false
          },
          {
            text: 'GoodWill Properties',
            pageUrl: '/Land',
            disabled: true
          }
        ],
        swiperOption: {
          direction: 'vertical',
          slidesPerView: 5,
          spaceBetween: 0,
          freeMode: true,
          loop: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets'
          }
        },
        e1: 0,
        properties: [],
        propers: [],
        laProperties: [],
        sortType: '',
        sortCategory: '',
        sortLocation: '',
        btnDisabled: true,
        search: '',
        forRent: 0,
        forSale: 0,
        apartments: 0,
        lands: 0,
        houses: 0,
        spaceToLet: 0,
        offices: 0,
        wareHouses: 0,
        add_landDialog: false,
        addLand_error: null,
        success: null,
        loading: false,
        land_valid: true,
        prop_title: '',
        features: [],
        facilities: [],
        propTypes: [],
        propCategories: [],
        areas: [],
        owners: [],
        showPreview: false,
        showMultiPreview: false,
        imagePreview: {
          propFile: '',
          propImg: '',
          otherImages: [],
          otherImgs: []
        },
        PropertyForm: {
          title: '',
          price: '',
          address: '',
          details: '',
          propLocation: '',
          propOwner: '',
          propType: '',
          propCategory: '',
          propFeatures: [],
          propFacilities: [],
          propImg: '',
          otherImgs: []
        },
        deleteProp_dialog: false,
        delete_prop: null,
        propID: null,
        customFilter (item, queryText, itemText) {
          const hasValue = val => val != null ? val : ''
          const text = hasValue(item.name)
          const query = hasValue(queryText)
          return text.toString()
            .toLowerCase()
            .indexOf(query.toString().toLowerCase()) > -1
        },
        rules: {
          titleRule: [v => !!v || 'Title required', v => !!v && (v.length <= 50 || 'This field should not be more than 50 Characters')],
          addressRule: [v => !!v || 'Address required', v => !!v && (v.length <= 150 || 'This field should not be more than 150 Characters')],
          priceRule: [v => !!v || 'Property price required', v => !!v && (v.length <= 15 || 'This field should not be more than 15 Characters')],
          detailsRule: [v => !!v || 'Property details required', v => !!v && (v.length <= 5000 || 'This field should not be more than 5000 Characters')],
          nameRule: [(v) => !!v || 'Property title required'],
          facilityRule: [(v) => !!v || 'Facilities required'],
          featureRule: [(v) => !!v || 'Features required'],
          categoryRule: [(v) => !!v || 'Category required'],
          ownerRule: [(v) => !!v || 'Property owner required'],
          locationRule: [(v) => !!v || 'Location required']
        }
      }
    },
    watch: {
      sortType: function (type) {
        if (type === '') {
          this.btnDisabled = true
        } else {
          this.btnDisabled = false
          let sortedProps = []
          if (this.sortCategory !== '') {
            for (let i = 0; i < this.laProperties.length; i++) {
              if (this.laProperties[i].type === type && this.laProperties[i].category === this.sortCategory) {
                sortedProps.push(this.laProperties[i])
              }
            }
          } else if (this.sortLocation !== '') {
            for (let i = 0; i < this.laProperties.length; i++) {
              if (this.laProperties[i].type === type && this.laProperties[i].location === this.sortLocation) {
                sortedProps.push(this.laProperties[i])
              }
            }
          } else if (this.sortLocation !== '' && this.sortCategory !== '') {
            for (let i = 0; i < this.laProperties.length; i++) {
              if (this.laProperties[i].type === type && this.laProperties[i].location === this.sortLocation && this.laProperties[i].category === this.sortCategory) {
                sortedProps.push(this.laProperties[i])
              }
            }
          } else {
            for (let i = 0; i < this.laProperties.length; i++) {
              if (this.laProperties[i].type === type) {
                sortedProps.push(this.laProperties[i])
              }
            }
          }
          this.properties = sortedProps
          this.propers = this.properties
        }
      },
      sortCategory: function (category) {
        if (category === '') {
          this.btnDisabled = true
        } else {
          this.btnDisabled = false
          let sortedProps = []
          if (this.sortType !== '') {
            for (let i = 0; i < this.laProperties.length; i++) {
              if (this.laProperties[i].category === category && this.laProperties[i].type === this.sortType) {
                sortedProps.push(this.laProperties[i])
              }
            }
          } else if (this.sortLocation !== '') {
            for (let i = 0; i < this.laProperties.length; i++) {
              if (this.laProperties[i].category === category && this.laProperties[i].location === this.sortLocation) {
                sortedProps.push(this.laProperties[i])
              }
            }
          } else if (this.sortLocation !== '' && this.sortType !== '') {
            for (let i = 0; i < this.laProperties.length; i++) {
              if (this.laProperties[i].category === category && this.laProperties[i].type === this.sortType && this.laProperties[i].location === this.sortLocation) {
                sortedProps.push(this.laProperties[i])
              }
            }
          } else {
            for (let i = 0; i < this.laProperties.length; i++) {
              if (this.laProperties[i].category === category) {
                sortedProps.push(this.laProperties[i])
              }
            }
          }
          this.properties = sortedProps
          this.propers = this.properties
        }
      },
      sortLocation: function (location) {
        if (location !== '') {
          this.btnDisabled = false
          let sortedProps = []
          if (this.sortType !== '') {
            for (let i = 0; i < this.laProperties.length; i++) {
              if (this.laProperties[i].location === location && this.laProperties[i].type === this.sortType) {
                sortedProps.push(this.laProperties[i])
              }
            }
          } else if (this.sortCategory !== '') {
            for (let i = 0; i < this.laProperties.length; i++) {
              if (this.laProperties[i].location === location && this.laProperties[i].category === this.sortCategory) {
                sortedProps.push(this.laProperties[i])
              }
            }
          } else if (this.sortCategory !== '' && this.sortType !== '') {
            for (let i = 0; i < this.laProperties.length; i++) {
              if (this.laProperties[i].location === location && this.laProperties[i].type === this.sortType && this.laProperties[i].category === this.sortCategory) {
                sortedProps.push(this.laProperties[i])
              }
            }
          } else {
            for (let i = 0; i < this.laProperties.length; i++) {
              if (this.laProperties[i].location === location) {
                sortedProps.push(this.laProperties[i])
              }
            }
          }
          this.properties = sortedProps
          this.propers = this.properties
        } else {
          this.btnDisabled = true
        }
      },
      search: function (keyword) {
        if (keyword !== '') {
          let prope = this.propers.filter(function (prop) {
            return prop.title.toLowerCase().indexOf(keyword) !== -1 || prop.location.toLowerCase().indexOf(keyword) !== -1 || prop.category.toLowerCase().indexOf(keyword) !== -1 || prop.type.toLowerCase().indexOf(keyword) !== -1 // returns true or false
          })
          console.log(prope)
          this.properties = prope
        } else {
          this.properties = this.propers
        }
      }
    },
    created () {
      this.Facilities()
      this.Features()
      this.Areas()
      this.Owners()
      this.Lands()
      this.PropertyCategories()
      this.PropertyTypes()
    },
    mounted () {
      this.Facilities()
      this.Features()
      this.Areas()
      this.Owners()
      this.Lands()
      this.PropertyCategories()
      this.PropertyTypes()
    },
    methods: {
      resetSort () {
        this.sortType = ''
        this.sortCategory = ''
        this.sortLocation = ''
        this.btnDisabled = !this.btnDisabled
        this.properties = this.laProperties
      },
      async Lands () {
        const response = await LandService.properties()
        this.properties = response.data.lands
        this.propers = this.properties
        this.laProperties = response.data.lands
        this.statsCalculator(response.data.lands)
      },
      statsCalculator (properties) {
        let rent = 0
        let sale = 0
        let land = 0
        let apartments = 0
        let offices = 0
        let houses = 0
        let wareHouses = 0
        let spaceToLet = 0
        for (let i = 0; i < properties.length; i++) {
          if (properties[i].category === 'Sale') {
            sale = sale + 1
          }
          if (properties[i].category === 'Rent') {
            rent = rent + 1
          }
          if (properties[i].type === 'Land') {
            land = land + 1
          }
          if (properties[i].type === 'House') {
            houses = houses + 1
          }
          if (properties[i].type === 'Apartment') {
            apartments = apartments + 1
          }
          if (properties[i].type === 'Office') {
            offices = offices + 1
          }
          if (properties[i].type === 'Ware House') {
            wareHouses = wareHouses + 1
          }
          if (properties[i].type === 'Space to let') {
            spaceToLet = spaceToLet + 1
          }
        }
        this.forSale = sale
        this.forRent = rent
        this.lands = land
        this.houses = houses
        this.apartments = apartments
        this.offices = offices
        this.wareHouses = wareHouses
        this.spaceToLet = spaceToLet
      },
      async Areas () {
        const response = await LocalityService.areas()
        this.areas = response.data.areas
      },
      async Owners () {
        const response = await OwnershipService.Owners()
        this.owners = response.data.owners
      },
      async Features () {
        const response = await FeatureFacilityService.Features()
        this.features = response.data.features
      },
      async Facilities () {
        const response = await FeatureFacilityService.Facilities()
        this.facilities = response.data.facilities
      },
      async PropertyCategories () {
        const response = await WhenNeededService.PropertyCategories()
        this.propCategories = response.data.property_categories
      },
      async PropertyTypes () {
        const response = await WhenNeededService.PropertyTypes()
        this.propTypes = response.data.property_types
        // console.log('a: ' + this.propTypes)
      },
      handleFileUpload () {
        this.imagePreview.propFile = this.$refs.propertyImage.files[0]

        let reader = new FileReader()
        reader.addEventListener('load', function () {
          this.showPreview = true
          this.imagePreview.propImg = reader.result
        }.bind(this), false)

        if (this.imagePreview.propFile) {
          if (/\.(jpe?g|png|gif)$/i.test(this.imagePreview.propFile.name)) {
            reader.readAsDataURL(this.imagePreview.propFile)
          }
        }
      },
      handleMultiFileUploads () {
        let uploadedFiles = this.$refs.files.files
        for (var i = 0; i < uploadedFiles.length; i++) {
          this.imagePreview.otherImages.push(uploadedFiles[i])
        }
        this.getImagePreviews()
      },
      getImagePreviews () {},
      cancel_addLand () {
        this.success = null
        this.addLand_error = null
        this.$refs.LandForm.reset()
        this.loading = false
        this.imagePreview.propImg = ''
        this.imagePreview.otherImages = []
        this.$refs.files.value = ''
        this.showPreview = false
        this.$refs.propertyImage.value = ''
        this.add_landDialog = false
      },
      deleteProperty (property) {
        this.delete_prop = property.title
        this.propID = property.prop_id
        this.deleteProp_dialog = true
      },
      async prop_delete () {
        // console.log('You can now delete the property: ' + this.propID)
        try {
          const response = await LandService.delete_prop({
            prop_id: this.propID
          })

          if (response) {
            this.deleteProp_dialog = false
            if (response.data.success === true) {
              this.properties = response.data.lands
              this.propers = this.properties
              this.laProperties = response.data.lands
              this.statsCalculator(response.data.lands)
            } else if (response.data.success === false) {
              console.log(response.data.error)
            }
          } else {
            console.log('Error deleting property.')
          }
        } catch (error) {
          console.log('Client error: ' + error)
        }
      },
      async AddLand () {
        this.addLand_error = null
        this.success = null
        // console.log('Property type: ' + this.PropertyForm.propType)

        try {
          if (this.$refs.LandForm.validate()) {
            this.loading = true
            const formDataPropImg = new FormData()
            formDataPropImg.append('propImage', this.imagePreview.propFile)

            const propImgResponse = await imgUploadService.singleImageUpload(formDataPropImg)

            if (propImgResponse) {
              if (propImgResponse.data.success === true) {
                this.PropertyForm.propImg = propImgResponse.data.fileUrl
                const formDataPropFiles = new FormData()
                for (let i = 0; i < this.imagePreview.otherImages.length; i++) {
                  let otherImage = this.imagePreview.otherImages[i]
                  formDataPropFiles.append('otherImages', otherImage)
                }

                const propImagesResponse = await imgUploadService.multiImageUpload(formDataPropFiles)
                if (propImagesResponse) {
                  this.imagePreview.propImg = ''
                  this.imagePreview.otherImages = []
                  this.$refs.files.value = ''
                  this.showPreview = false
                  this.$refs.propertyImage.value = ''
                  if (propImagesResponse.data.success === true) {
                    this.PropertyForm.otherImgs = propImagesResponse.data.fileUrls
                    // add land property now
                    const response = await LandService.AddLand({
                      'title': this.PropertyForm.title,
                      'propType': this.PropertyForm.propType,
                      'category': this.PropertyForm.propCategory,
                      'price': this.PropertyForm.price,
                      'address': this.PropertyForm.address,
                      'details': this.PropertyForm.details,
                      'location': this.PropertyForm.propLocation,
                      'owner': this.PropertyForm.propOwner,
                      'features': this.PropertyForm.propFeatures,
                      'facilities': this.PropertyForm.propFacilities,
                      'bgTileImg': this.PropertyForm.propImg,
                      'otherImages': this.PropertyForm.otherImgs
                    })

                    if (response) {
                      this.loading = false
                      if (response.data.success === true) {
                        this.$refs.LandForm.reset()
                        this.properties = response.data.lands
                        this.propers = this.properties
                        this.laProperties = response.data.lands
                        this.success = response.data.message
                        this.statsCalculator(response.data.lands)
                      } else if (response.data.success === false) {
                        if (response.data.error_type === 0) {
                          this.addLand_error = response.data.error[0]
                          console.log(response.data.error[0])
                        } else if (response.data.error_type === 1) {
                          this.addLand_error = response.data.error
                          console.log(response.data.error)
                        } else {
                          this.addLand_error = 'Error !!!'
                        }
                      }
                    } else {
                      this.addLand_error = 'An error occured adding land property.'
                    }
                  } else {
                    this.addLand_error = propImagesResponse.data.message
                  }
                } else {
                  this.addLand_error = 'An error occured uploading images.'
                }
              } else {
                this.addLand_error = propImgResponse.data.message
              }
            } else {
              this.addLand_error = 'An error occured uploading image.'
            }
          } else {
            this.addLand_error = '*Please fill all required fields.'
          }
        } catch (error) {
          this.addLand_error = error
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
  .swiper-slide{
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .swiper-container {
    height : 150px;
  }
  .errorMessage {
    color: red;
  }
  .successMessage {
    color: green;
  }
  .tabTitle {
    text-transform: capitalize;
  }
  .p-btn, #formBtn, .propBtn{
    text-transform: capitalize;
  }
  .cardTitle {
    text-transform: capitalize;
    font-size: 120%;
  }
  .overflow-hidden {
    overflow: hidden;
  }
  .horiz-scroll {
    overflow-y: hidden;
    overflow-x: auto;
  }
  .Sale {
    color: #FF5722;
  }
  .Rent {
    color: #0091EA;
  }
  .NewDevelopment {
    color: #00BFA5;
  }
</style>
