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
          <span class="secondary--text  ml-3">{{owners.length}} Property  Owners</span>
        </v-flex>
        <v-flex xs12 sm8 md8 class="text-md-right text-sm-right">
          <v-dialog v-model="add_ownerDialog" max-width="500px" persistent>
            <v-btn round slot="activator" class="p-btn" color="primary" dark>
              <v-icon dark left>control_point</v-icon>
              Add Property Owner
            </v-btn>
            <v-card>
              <v-card-title>
                <span class="cardTitle">Add Property Owner</span>
              </v-card-title>
              <v-card-text>
                <div class="errorMessage" v-html="addOwner_error" />
                <v-container>
                  <v-layout wrap>
                    <v-flex xs12 md12>
                      <v-form ref="OwnerForm" v-model="owner_valid" lazy-validation>
                        <v-text-field
                        label="Full Name*"
                        v-model="owner_name"
                        :rules="nameRule"
                        required></v-text-field>
                        <v-text-field
                        label="Contact*"
                        v-model="owner_contact"
                        :rules="contactRule"
                        required></v-text-field>
                        <!-- <v-text-field
                        label="Email (Optional)"
                        v-model="owner_email"
                        :rules="emailRule"
                        required></v-text-field> -->
                        <v-select
                          :items="ownerships"
                          v-model="ownership_type"
                          item-text="ownership"
                          item-value="ownership"
                          label="Select Ownership"
                          :rules="[(v) => !!v || 'Ownership required']"
                          placeholder="Select Ownership" required
                          cache-items
                        ></v-select>
                        <!-- <v-text-field
                        label="Lincense Number (Optional)"
                        v-model="agent_lincense"
                        :rules="LincenseNumberRule"
                        ></v-text-field> -->
                      </v-form>
                    </v-flex>
                  </v-layout>
                  <div class="successMessage mt-2" v-html="success" />
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="cancel_addOwner">Close</v-btn>
                <v-btn
                  color="blue darken-1"
                  :disabled="!owner_valid"
                  flat
                  :loading="loading"
                  @click.native="AddOwner">Save</v-btn>
              </v-card-actions>
           </v-card>
          </v-dialog>
        </v-flex>

        <v-flex xs12 v-if="owners.length > 0">
          <v-layout row my-5>
            <v-flex xs12 md12>
              <v-card>
                <v-card-title>
                  <!-- ({{owners.length}}) registered property owners -->
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                    solo-inverted
                  ></v-text-field>
                </v-card-title>
                <v-data-table
                  :headers="headers"
                  :items="owners"
                  class="elevation-0"
                  :search="search"
                  prev-icon="mdi-menu-left"
                  next-icon="mdi-menu-right"
                  sort-icon="mdi-menu-down"
                >
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.name.toUpperCase() }}</td>
                    <td class="text-xs-center">{{ props.item.contact }}</td>
                    <td class="text-xs-center">{{ props.item.ownership }}</td>
                    <td class="justify-center layout px-0">
                      <v-btn icon class="mx-0" @click="editOwner(props.item)">
                        <v-icon color="teal">edit</v-icon>
                      </v-btn>
                      <v-btn icon class="mx-0" @click="deleteOwner(props.item)">
                        <v-icon color="pink">delete</v-icon>
                      </v-btn>
                    </td>
                  </template>
                  <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Your search for "{{ search }}" found no results.
                  </v-alert>
                </v-data-table>
                <v-layout row justify-center>
                  <v-dialog v-model="deleteOwner_dialog" max-width="400">
                    <v-card>
                      <v-card-text>Are you sure you want to delete {{delete_owner}}.</v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" flat="flat" @click.native="close_deleteDialog">Cancel</v-btn>
                        <v-btn color="green darken-1" v-show="visible" flat="flat" @click.native="owner_delete">Ok</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="editOwner_dialog" persistent max-width="500px">
                    <v-card>
                      <v-card-title>
                        <span class="">Edit Property Owner</span>
                      </v-card-title>
                      <v-card-text>
                        <div class="errorMessage" v-html="edit_error" />
                        <v-container fluid>
                          <v-layout wrap>
                            <v-flex xs12 md12>
                              <v-form ref="editOwnerForm" v-model="ownerEdit_valid" lazy-validation>
                                <v-text-field
                                label="Property owner name*"
                                v-model="old_name"
                                :rules="nameRule"
                                required></v-text-field>
                                <v-text-field
                                label="Property owner contact*"
                                v-model="old_contact"
                                :rules="contactRule"
                                required></v-text-field>
                                <v-select
                                    :items="ownerships"
                                    v-model="old_ownership"
                                    item-text="ownership"
                                    item-value="ownership"
                                    label="Select ownership"
                                    :rules="[(v) => !!v || 'Property ownership required']"
                                    placeholder="Select Ownership" required
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
                          :disabled="ownerEdit_valid"
                          flat="flat"
                          :loading="edit_button"
                          @click.native="owner_edit">Save</v-btn>
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
        </v-flex>
        <v-flex xs12 v-else class="text-xs-center">
          <p class="pt-5">No property owners added yet.</p>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import OwnershipService from '@/Services/OwnershipService'
  export default {
    data () {
      return {
        page_title: 'Property Ownership',
        pages: [
          {
            text: 'Home',
            pageUrl: '/Dashboard',
            disabled: false
          },
          {
            text: 'Property Ownership',
            pageUrl: '/Ownership',
            disabled: true
          }
        ],
        search: '',
        owners: [],
        add_ownerDialog: false,
        addOwner_error: null,
        deleteOwner_dialog: false,
        delete_owner: '',
        success: null,
        loading: false,
        owner_valid: true,
        ownerEdit_valid: true,
        owner_name: '',
        owner_contact: '',
        lincense_visible: false,
        visible: true,
        message_dialog: false,
        message: null,
        messageClass: null,
        owner_email: '',
        ownerships: ['Personal', 'Agent'],
        agent_lincense: '',
        ownership_type: '',
        owner_id: null,
        old_name: '',
        new_name: '',
        old_contact: '',
        new_contact: '',
        old_ownership: '',
        new_ownership: '',
        edit_button: false,
        edit_error: null,
        editOwner_dialog: false,
        nameRule: [(v) => !!v || 'Property title required'],
        contactRule: [
          (v) => !!v || 'Contact required'
        ],
        LincenseNumberRule: [(v) => !!v || 'Lincense number required'],
        emailRule: [(v) => !!v || 'Email required'],
        headers: [
          {
            text: 'Owner Name',
            align: 'left',
            sortable: true,
            value: 'name'
          },
          { text: 'Contact', value: 'contact', align: 'center' },
          { text: 'Ownership', value: 'ownership', align: 'center' },
          { text: 'Actions', value: 'actions', align: 'center', sortable: false }
        ]
      }
    },
    watch: {
      old_name: function (name) {
        if (name.toUpperCase() === this.new_name && this.old_ownership === this.new_ownership && this.old_contact.toString() === this.new_contact) {
          this.ownerEdit_valid = true
        } else {
          this.ownerEdit_valid = false
        }
      },
      old_contact: function (contact) {
        if (contact.toString() === this.new_contact && this.old_ownership === this.new_ownership && this.old_name === this.new_name) {
          this.ownerEdit_valid = true
        } else {
          this.ownerEdit_valid = false
        }
      },
      old_ownership: function (ownership) {
        if (ownership === this.new_ownership && this.old_name === this.new_name && this.old_contact.toString() === this.new_contact) {
          this.ownerEdit_valid = true
        } else {
          this.ownerEdit_valid = false
        }
      }
    },
    created () {
      this.Owners()
    },
    mounted () {
      this.Owners()
    },
    methods: {
      async Owners () {
        const response = await OwnershipService.Owners()
        this.owners = response.data.owners
      },
      cancel_addOwner () {
        this.success = null
        this.addOwner_error = null
        this.$refs.OwnerForm.reset()
        this.add_ownerDialog = false
      },
      async AddOwner () {
        if (this.$refs.OwnerForm.validate()) {
          this.success = null
          this.addOwner_error = null
          this.loading = true

          const response = await OwnershipService.AddOwner({
            'name': this.owner_name,
            'contact': this.owner_contact,
            'ownership': this.ownership_type
          })

          if (response) {
            this.loading = false
            if (response.data.success === true) {
              this.messageClass = 'successMessage'
              this.$refs.OwnerForm.reset()
              this.owners = response.data.owners
              this.success = response.data.message
            } else {
              if (response.data.error_type === 0) {
                this.addOwner_error = response.data.error[0]
              } else if (response.data.error_type === 1) {
                this.addOwner_error = response.data.error
              }
            }
          }
        }
      },
      editOwner (owner) {
        this.owner_id = owner.owner_id
        this.old_name = owner.name.toUpperCase()
        this.new_name = owner.name.toUpperCase()
        this.old_contact = owner.contact
        this.new_contact = owner.contact.toString()
        this.old_ownership = owner.ownership
        this.new_ownership = owner.ownership
        this.editOwner_dialog = true
      },
      cancel_edit () {
        this.editOwner_dialog = false
      },
      owner_edit () {
        console.log('edit now.')
      },
      deleteOwner (owner) {
        this.owner_id = owner.owner_id
        this.delete_owner = owner.name
        this.deleteOwner_dialog = true
      },
      close_deleteDialog () {
        this.delete_owner = null
        this.deleteOwner_dialog = false
      },
      async owner_delete () {
        const response = await OwnershipService.delete_owner({
          'owner_id': this.owner_id
        })

        if (response.data.success === true) {
          this.deleteOwner_dialog = false
          this.owners = response.data.owners
          this.message = response.data.message
          this.message_dialog = true
        } else {
          this.deleteOwner_dialog = false
          this.message_dialog = true
          this.messageClass = 'errorMessage'
          if (response.data.error_type === 0) {
            this.message = response.data.error[0]
          } else if (response.data.error_type === 1) {
            this.message = response.data.error
          }
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
  .tabTitle {
    text-transform: capitalize;
  }
  .p-btn{
    text-transform: capitalize;
  }
  .cardTitle {
    text-transform: capitalize;
    font-size: 120%;
  }
</style>
