<template>
  <div class="mainDiv">
    <v-card class="mb-4 pb-3">
      <v-card-title class="grey--text" primary-title>
        <v-layout row wrap>
          <v-flex xs8><h4>Property Owner</h4></v-flex>
          <v-flex xs4 class="text-xs-right pa-0">
            <v-btn icon ripple @click="showChangeOwner">
              <v-icon color="primary lighten-1">edit</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-card-text class="pt-0">
        <p class="mt-0">
          <v-icon color="grey lighten-1">person</v-icon>
          <span class="ml-2">{{ PropOwner.name }}</span>
        </p>
        <p class="mt-0">
          <v-icon color="grey lighten-1">local_phone</v-icon>
          <span class="ml-2">{{ PropOwner.contact }}</span>
        </p>
        <p class="" v-if="PropOwner.Lincense">
          <v-icon color="grey lighten-1">book</v-icon>
          <span class="ml-2">{{ PropOwner.Lincense }}</span>
        </p>
        <p class="" v-if="PropOwner.email">
          <v-icon color="grey lighten-1">email</v-icon>
          <span class="ml-2">{{ PropOwner.email }}</span>
        </p>
        <p class="">
          <v-icon color="grey lighten-1">verified_user</v-icon>
          <span class="ml-2">{{ PropOwner.ownership }}</span>
        </p>
      </v-card-text>
    </v-card>
    <v-dialog v-model="changeOwnerDialog" max-width="400">
      <v-card class="pa-2">
        <v-card-title>
          <h3 color="text-color-primary" class="">Change Property Owner</h3>
        </v-card-title>
        <v-card-text>
          <v-autocomplete
              :items="owners"
              v-model="owner"
              item-text="name"
              item-value="owner_id"
              label="Property Owners"
              placeholder="Choose Owner"
              cache-items></v-autocomplete>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat
           @click.native="changeOwnerDialog = false">cancel</v-btn>
          <v-btn
           color="primary darken-1"
           :disabled="changeOnwerValid"
           flat
           :loading="loading"
           @click.native="changeOwner">Change Owner</v-btn>
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
    <v-card class="mb-4 pb-3">
      <v-card-text>
        <strong>This Property has been viewed {{ views }} times.</strong>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  import singlePropService from '@/Services/singleProp'
  import OwnershipService from '@/Services/OwnershipService'
  export default {
    props: {
      prop_id: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        propID: this.prop_id,
        ownerID: '',
        PropOwner: {},
        changeOwnerDialog: false,
        changeOnwerValid: true,
        message_dialog: false,
        editResponse: null,
        messageClass: '',
        loading: false,
        owners: [],
        owner: null,
        views: 0
      }
    },
    watch: {
      owner (ownerID) {
        if (ownerID === this.ownerID) {
          this.changeOnwerValid = true
        } else {
          this.changeOnwerValid = false
        }
      }
    },
    created () {
      this.Owner()
      this.Owners()
    },
    mounted () {
      this.Owner()
      this.Owners()
    },
    methods: {
      async Owners () {
        const response = await OwnershipService.Owners()
        this.owners = response.data.owners
      },
      async Owner () {
        try {
          const response = await singlePropService.propOwner({
            propID: this.propID
          })
          this.PropOwner = response.data.owner
          this.ownerID = response.data.owner.ownerID
        } catch (error) {
          console.log(error)
        }
      },
      showChangeOwner () {
        this.owner = this.ownerID
        this.changeOwnerDialog = true
      },
      async changeOwner () {
        this.loading = true
        try {
          const response = await singlePropService.changeOwner({
            owner: this.owner,
            propID: this.propID
          })
          if (response) {
            this.loading = false
            if (response.data.success === true) {
              this.PropOwner = response.data.owner
              this.ownerID = response.data.owner.ownerID
              this.editResponse = response.data.message
              this.changeOwnerDialog = false
              this.message_dialog = true
            } else if (response.data.success === false) {
              console.log(response.data.error)
            }
          } else {
            console.log('Error: no response from the server.')
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
</style>
