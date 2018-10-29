<template>
  <v-container fluid mt-5>
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap>
        <v-flex xs12 md12 text-xs-center>
          <h1 v-text="companyBrand" class="primary--text mt-5"></h1>
        </v-flex>
        <v-flex mt-3 xs10 offset-xs1 sm6 offset-sm3 md4 offset-md4>
          <v-card>
            <v-container>
              <v-layout row>
                <v-flex xs12>
                  <v-card-title>
                    <span class="harod pl-2 mt-4 primary--text">Enter your account credentials to log in.</span>
                  </v-card-title>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12 md12>
                  <v-form class="pb-4 px-4" ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                      v-model="username"
                      :rules="usernameRules"
                      :counter="20"
                      label="Username"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="password"
                      :rules="passwordRules"
                      label="Password"
                      :type="e1 ? 'password' : 'text'"
                      :append-icon="e1 ? 'visibility' : 'visibility_off'"
                      @click:append="() => (e1 = !e1)"
                      min="8"
                      required
                    ></v-text-field>
                    <v-btn
                      :disabled="!valid"
                      @click="login"
                      color="primary"
                    >
                      Login
                    </v-btn>
                    <div class="errorMessage mt-3" v-html="error" />
                  </v-form>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
  import AuthenticationService from '@/Services/AuthenticationService'
  export default {
    data () {
      return {
        valid: true,
        companyBrand: 'GoodWill',
        username: '',
        usernameRules: [(v) => !!v || 'Username is required'],
        password: '',
        e1: true,
        passwordRules: [(v) => !!v || 'Password is required'],
        account: 'If you forgot your password,contact the admistrator.',
        error: null
      }
    },
    methods: {
      async login () {
        if (this.$refs.form.validate()) {
          this.error = ''
          try {
            const response = await AuthenticationService.Login({
              username: this.username,
              password: this.password
            })

            if (response.data.auth === true) {
              this.$store.dispatch('setToken', response.data.token)
              this.$store.dispatch('setUser', response.data.user)
              this.$router.push('/Dashboard')
            } else if (response.data.auth === false) {
              this.error = response.data.message
            }
          } catch (error) {
            this.error = 'Some went wrong while logging in. Please try again.'
            // console.log(error)
          }
          this.$refs.form.reset()
        } else {
          this.error = 'Username and pasword are required for you to log in.'
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
</style>
