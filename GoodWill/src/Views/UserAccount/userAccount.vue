<template>
  <div class="mainDiv">
    <app-header></app-header>
    <v-container mb-5>
      <v-layout row wrap mt-5>
        <v-flex xs12>
          <h2>My Profile</h2>
          <app-breadcrumb v-bind:items="pages"></app-breadcrumb>
        </v-flex>
      </v-layout>

      <v-layout row wrap class="py-5">
        <v-flex xs12 sm8 md8 class="pr-5">
          <v-expansion-panel focusable>
            <v-expansion-panel-content>
              <div slot="header">
                <v-icon class="mr-4">person</v-icon>Edit Profile
              </div>
              <v-card>
                <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
              </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <div slot="header">
                <v-icon class="mr-4">edit</v-icon>Change Username
              </div>
              <v-card>
                <v-card-text class="grey lighten-3">
                  <v-form class="pb-4 px-4" ref="changeUsernameForm"
                    v-model="changeUsername.validUsername" lazy-validation>
                    <v-layout row wrap>
                      <v-flex class="pa-2" xs12 sm6 md6>
                        <v-text-field
                          v-model="changeUsername.oldUsername"
                          :rules="rules.usernameRules"
                          label="Old Username"
                          :counter="20"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex class="pa-2" xs12 sm6 md6>
                        <v-text-field
                          v-model="changeUsername.newUsername"
                          :rules="rules.usernameRules"
                          label="New Username"
                          :counter="20"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex class="pa-0 text-xs-right" xs12>
                        <v-btn
                          :disabled="!changeUsername.validUsername"
                          @click="changeUsernamee"
                          color="primary">
                          Change Username
                        </v-btn>
                      </v-flex>
                    </v-layout>
                    <div class="errorMessage mt-3" v-html="changePassword.errorPassword" />
                  </v-form>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <div slot="header">
                <v-icon class="mr-4">lock</v-icon>Change Password
              </div>
              <v-card>
                <v-card-text class="grey lighten-3">
                  <v-form class="pb-4 px-4" ref="changePasswordForm"
                  v-model="changePassword.validPassword" lazy-validation>
                    <v-layout row wrap>
                      <v-flex class="pa-2" xs12 sm6 md6>
                        <v-text-field
                          v-model="changePassword.oldPassword"
                          :rules="rules.passwordRules"
                          label="Old Password"
                          :type="changePassword.e1 ? 'password' : 'text'"
                          :append-icon="changePassword.e1 ? 'visibility' : 'visibility_off'"
                          @click:append="() => (changePassword.e1 = !changePassword.e1)"
                          min="8"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex class="pa-2" xs12 sm6 md6>
                        <v-text-field
                          v-model="changePassword.newPassword"
                          :rules="rules.passwordRules"
                          label="New Password"
                          :type="changePassword.e2 ? 'password' : 'text'"
                          :append-icon="changePassword.e2 ? 'visibility' : 'visibility_off'"
                          @click:append="() => (changePassword.e2 = !changePassword.e2)"
                          min="8"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex class="pa-0 text-xs-right" xs12>
                        <v-btn
                          :disabled="!changePassword.validPassword"
                          @click="changePassworde"
                          color="primary">
                          Change Password
                        </v-btn>
                      </v-flex>
                    </v-layout>
                    <div class="errorMessage mt-3" v-html="changePassword.errorPassword" />
                  </v-form>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <v-card>
            <v-card-title class="text-xs-center" primary-title>
              <h3>{{ $store.state.user.fname }} {{ $store.state.user.lname }} </h3>
            </v-card-title>
            <v-card-text>
              <p>Gender: <span class="ml-3">{{ userData.UserGender }}</span></p>
              <p>Date of birth: <span class="ml-3">{{ userData.UserDOB }}</span></p>
              <p>Contact: <span class="ml-3">{{ userData.UserContact }}</span></p>
              <p>Email address: <span class="ml-3">{{ userData.UserEmail }}</span></p>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import useraccount from '@/Services/OwnershipService'
  export default {
    data () {
      return {
        pages: [
          {
            text: 'Home',
            pageUrl: '/Dashboard',
            disabled: false
          },
          {
            text: 'My Profile',
            pageUrl: '/singleUserAccount',
            disabled: false
          }
        ],
        userID: this.$store.state.user.userID,
        userData: [],
        editProfile: {
          fname: '',
          lname: '',
          gender: '',
          contact: '',
          email: '',
          dob: '',
          errorProfile: null
        },
        changeUsername: {
          validUsername: false,
          newUsername: '',
          oldUsername: '',
          errorUsername: null
        },
        changePassword: {
          validPassword: false,
          newPassword: '',
          oldPassword: '',
          errorPassword: null,
          e1: true,
          e2: true
        },
        rules: {
          passwordRules: [(v) => !!v || 'Password is required'],
          usernameRules: [(v) => !!v || 'Username is required']
        }
      }
    },
    created () {
      this.userAccount()
    },
    mounted () {
      this.userAccount()
    },
    methods: {
      async userAccount () {
        try {
          if (this.userID) {
            const response = await useraccount.singleUserAccount({
              userID: this.userID
            })

            if (response) {
              if (response.data.success) {
                this.userData = response.data.user
              } else {
                console.log(response.data.error)
              }
            }
          }
        } catch (error) {
          console.log(error)
        }
      },
      changePassworde () {},
      changeUsernamee () {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
