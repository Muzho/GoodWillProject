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
              <v-card class="pa-2">
                <v-card-text>
                  <v-form ref="editUserProfileForm" v-model="editValid" lazy-validation>
                    <v-layout row wrap>
                      <v-flex xs12 sm6 md6 class="pa-1">
                        <v-text-field
                        label="First Name*"
                        v-model="efname"
                        :rules="rules.nameRule"
                        required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md6 class="pa-1">
                        <v-text-field
                        label="Last Name*"
                        v-model="elname"
                        :rules="rules.nameRule"
                        required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md6 class="pa-1">
                        <v-select
                            :items="userGender"
                            v-model="egender"
                            label="Select gender"
                            :rules="rules.genderRule"
                            placeholder="Select gender"
                            cache-items
                          ></v-select>
                      </v-flex>
                      <v-flex xs12 sm6 md6 class="pa-1">
                        <v-menu
                        ref="menu"
                        lazy
                        :close-on-content-click="false"
                        v-model="menu"
                        transition="scale-transition"
                        offset-y
                        full-width
                        :nudge-right="40"
                        min-width="290px">
                          <v-text-field
                          label="Date of birth*"
                          slot="activator"
                          v-model="edob"
                          :rules="rules.dobRule"
                          readonly
                          required></v-text-field>
                          <v-date-picker
                          ref="picker"
                          v-model="edob"
                          @change="save"
                          min="1920-01-01"
                          :max="new Date().toISOString().substr(0, 10)"
                          required></v-date-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex xs12 sm6 md6 class="pa-1">
                        <v-text-field
                        label="Contact*"
                        v-model="econtact"
                        :rules="rules.contactRule"
                        required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md6 class="pa-1">
                        <v-text-field
                        label="Email Address*"
                        v-model="eemail"
                        :rules="rules.emailRule"
                        required></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-form>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-text>
                  <div class="errorMessage mt-3" v-html="errorEditProfile" />
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                    <v-btn
                      :disabled="editValid"
                      @click.native="editUserProfile"
                      :loading="editProfileLoading"
                      color="primary">
                      Edit Profile
                    </v-btn>
                </v-card-actions>
              </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <div slot="header">
                <v-icon class="mr-4">edit</v-icon>Change Username
              </div>
              <v-card>
                <v-card-text class="grey lighten-3">
                  <v-form class="pb-4 px-4" ref="changeUsernameForm"
                    v-model="validUsername" lazy-validation>
                    <v-layout row wrap>
                      <v-flex class="pa-2" xs12 sm6 md6>
                        <v-text-field
                          v-model="oldUsername"
                          :rules="rules.usernameRules"
                          label="Old Username"
                          :counter="20"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex class="pa-2" xs12 sm6 md6>
                        <v-text-field
                          v-model="newUsername"
                          :rules="rules.usernameRules"
                          label="New Username"
                          :counter="20"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex class="pa-0 text-xs-right" xs12>
                        <v-btn
                          :disabled="!validUsername"
                          @click="changeUsernamee"
                          :loading="usernameLoading"
                          color="primary">
                          Change Username
                        </v-btn>
                      </v-flex>
                    </v-layout>
                    <div class="errorMessage mt-3" v-html="errorUsername" />
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
                  v-model="validPassword" lazy-validation>
                    <v-layout row wrap>
                      <v-flex class="pa-2" xs12 sm6 md6>
                        <v-text-field
                          v-model="oldPassword"
                          :rules="rules.passwordRules"
                          label="Old Password"
                          :type="e1 ? 'password' : 'text'"
                          :append-icon="e1 ? 'visibility' : 'visibility_off'"
                          @click:append="() => (e1 = !e1)"
                          min="8"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex class="pa-2" xs12 sm6 md6>
                        <v-text-field
                          v-model="newPassword"
                          :rules="rules.passwordRules"
                          label="New Password"
                          :type="e2 ? 'password' : 'text'"
                          :append-icon="e2 ? 'visibility' : 'visibility_off'"
                          @click:append="() => (e2 = !e2)"
                          min="8"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex class="pa-0 text-xs-right" xs12>
                        <v-btn
                          :disabled="!validPassword"
                          @click="changePassworde"
                          :loading="passwordLoading"
                          color="primary">
                          Change Password
                        </v-btn>
                      </v-flex>
                    </v-layout>
                    <div class="errorMessage mt-3" v-html="errorPassword" />
                  </v-form>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <v-card>
            <v-card-title class="text-xs-center" primary-title>
              <!-- <h3>{{ $store.state.user.fname }} {{ $store.state.user.lname }} </h3> -->
              <h3>{{ userData.UserFirstName }} {{ userData.UserLastName }}</h3>
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
      <v-layout row justify-center>
        <v-dialog v-model="messageDialog" persistent max-width="400">
          <v-card>
            <v-card-text>{{ message }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat="flat" @click.native="redirectToLogin">Ok</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="successDialog" persistent max-width="400">
          <v-card>
            <v-card-text>{{ successMessage }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat="flat" @click.native="successDialog = false">Ok</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import useraccount from '@/Services/OwnershipService'
  import AuthenticationService from '@/Services/AuthenticationService'
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
        message: '',
        successMessage: '',
        editValid: true,
        editProfileLoading: false,
        errorEditProfile: null,
        menu: false,
        efname: '',
        elname: '',
        egender: '',
        econtact: '',
        eemail: '',
        edob: '',
        fnamee: '',
        lnamee: '',
        gendere: '',
        contacte: '',
        emaile: '',
        dobe: '',
        errorProfile: null,
        validUsername: false,
        newUsername: '',
        oldUsername: '',
        errorUsername: null,
        usernameLoading: false,
        validPassword: false,
        newPassword: '',
        oldPassword: '',
        errorPassword: null,
        e1: true,
        e2: true,
        passwordLoading: false,
        messageDialog: false,
        successDialog: false,
        userGender: ['Male', 'Female'],
        rules: {
          passwordRules: [(v) => !!v || 'Password is required'],
          usernameRules: [(v) => !!v || 'Username is required'],
          nameRule: [(v) => !!v || 'Name required'],
          genderRule: [(v) => !!v || 'Gender required'],
          contactRule: [
            (v) => !!v || 'Contact required'
          ],
          emailRule: [(v) => !!v || 'Email required'],
          dobRule: [(v) => !!v || 'Date of birth required']
        }
      }
    },
    watch: {
      menu (val) {
        val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
      efname (namee) {
        if (namee.toUpperCase() === this.fnamee &&
        this.elname.toUpperCase() === this.lnamee &&
        this.egender === this.gendere && this.edob === this.dobe &&
        this.econtact.toString() === this.contacte && this.eemail === this.emaile) {
          console.log('no chnage: ' + name)
          this.editValid = true
        } else {
          this.editValid = false
        }
      },
      elname (namee) {
        if (namee.toUpperCase() === this.lnamee &&
        this.efname.toUpperCase() === this.fnamee &&
        this.egender === this.gendere && this.edob === this.dobe &&
        this.econtact.toString() === this.contacte && this.eemail === this.emaile) {
          this.editValid = true
        } else {
          this.editValid = false
        }
      },
      egender (genda) {
        if (this.efname.toUpperCase() === this.fnamee &&
        this.elname.toUpperCase() === this.lnamee &&
        genda === this.gendere && this.edob === this.dobe &&
        this.econtact.toString() === this.contacte && this.eemail === this.emaile) {
          this.editValid = true
        } else {
          this.editValid = false
        }
      },
      edob (dob) {
        if (this.efname.toUpperCase() === this.fnamee &&
        this.elname.toUpperCase() === this.lnamee &&
        this.egender === this.gendere && dob === this.dobe &&
        this.econtact.toString() === this.contacte && this.eemail === this.emaile) {
          this.editValid = true
        } else {
          this.editValid = false
        }
      },
      econtact (contact) {
        if (this.efname.toUpperCase() === this.fnamee &&
        this.elname.toUpperCase() === this.lnamee &&
        this.egender === this.gendere && this.edob === this.dobe &&
        contact.toString() === this.contacte && this.eemail === this.emaile) {
          this.editValid = true
        } else {
          this.editValid = false
        }
      },
      eemail (email) {
        if (this.efname.toUpperCase() === this.fnamee &&
        this.elname.toUpperCase() === this.lnamee &&
        this.egender === this.gendere && this.edob === this.dobe &&
        this.econtact.toString() === this.contacte && email === this.emaile) {
          this.editValid = true
        } else {
          this.editValid = false
        }
      }
    },
    created () {
      this.userAccount()
    },
    mounted () {
      this.userAccount()
      this.showDate()
    },
    methods: {
      showDate () {},
      save (dob) {
        this.$refs.menu.save(dob)
      },
      async userAccount () {
        try {
          if (this.userID) {
            const response = await useraccount.singleUserAccount({
              userID: this.userID
            })

            if (response) {
              if (response.data.success) {
                this.userData = response.data.user
                this.fillEdit(response.data.user)
              } else {
                console.log(response.data.error)
              }
            }
          }
        } catch (error) {
          console.log(error)
        }
      },
      async editUserProfile () {
        if (this.$refs.editUserProfileForm.validate()) {
          this.errorEditProfile = null
          this.editProfileLoading = true
          const response = await AuthenticationService.editUserProfile({
            userID: this.userID,
            fname: this.efname,
            lname: this.elname,
            gender: this.egender,
            dob: this.edob.toString(),
            contact: this.econtact,
            email: this.eemail
          })
          if (response) {
            this.editProfileLoading = false
            if (response.data.success === true) {
              this.successMessage = response.data.message
              this.userData = response.data.user
              this.fillEdit(response.data.user)
              let editedUserData = {}
              editedUserData.userID = response.data.user.User_Id
              editedUserData.fname = response.data.user.UserFirstName
              editedUserData.lname = response.data.user.UserLastName
              this.$store.dispatch('setUser', editedUserData)
              this.editValid = !this.editValid
              this.successDialog = true
            } else if (response.data.success === false) {
              if (response.data.error_type === 0) {
                this.errorEditProfile = response.data.error[0]
              } else if (response.data.error_type === 1) {
                this.errorEditProfile = response.data.error
              } else {
                this.errorEditProfile = response.data.error
              }
            }
          }
        } else {
          this.errorEditProfile = 'All fields required. Please fill all fields and try again.'
        }
      },
      fillEdit (user) {
        this.efname = user.UserFirstName
        this.elname = user.UserLastName
        this.egender = user.UserGender
        this.econtact = user.UserContact
        this.edob = user.UserDOB
        this.eemail = user.UserEmail
        this.fnamee = user.UserFirstName.toUpperCase()
        this.lnamee = user.UserLastName.toUpperCase()
        this.gendere = user.UserGender
        this.contacte = user.UserContact.toString()
        this.dobe = user.UserDOB
        this.emaile = user.UserEmail
      },
      async changePassworde () {
        this.errorPassword = null
        if (this.$refs.changePasswordForm.validate()) {
          try {
            this.passwordLoading = true
            const response = await AuthenticationService.changeUserPassword({
              userID: this.userID,
              oldPassword: this.oldPassword,
              newPassword: this.newPassword
            })

            if (response) {
              this.passwordLoading = false
              if (response.data.success === true) {
                this.message = response.data.message
                this.messageDialog = true
              } else if (response.data.success === false) {
                if (response.data.error_type === 0) {
                  this.errorPassword = response.data.error[0]
                } else if (response.data.error_type === 1) {
                  this.errorPassword = response.data.error
                } else {
                  this.errorPassword = response.data.error
                }
              }
            }
            this.$refs.changePasswordForm.reset()
          } catch (error) {
            this.errorPassword = error
          }
        } else {
          this.errorPassword = 'All fields are required for you to change password.'
        }
      },
      async changeUsernamee () {
        try {
          this.errorUsername = null
          if (this.$refs.changeUsernameForm.validate()) {
            this.usernameLoading = true
            const response = await AuthenticationService.changeUsername({
              userID: this.userID,
              oldUsername: this.oldUsername,
              newUsername: this.newUsername
            })

            if (response) {
              this.usernameLoading = false
              if (response.data.success === true) {
                this.message = response.data.message
                this.messageDialog = true
              } else if (response.data.success === false) {
                this.errorUsername = response.data.error
              }
            }
            this.$refs.changeUsernameForm.reset()
          } else {
            this.errorUsername = 'All fields are required for you to change username.'
          }
        } catch (error) {
          this.errorUsername = error
        }
      },
      redirectToLogin () {
        this.messageDialog = false
        this.$store.dispatch('logout')
          .then(() => {
            this.$router.push('/')
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .errorMessage {
    color: red;
  }
</style>
