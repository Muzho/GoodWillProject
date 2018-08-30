<template>
  <v-card class="py-5" flat>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
          <h2 class="mb-4"> Sign In with </h2>
          <div class="text-xs-center">
            <v-btn dark color="red">
              Google
            </v-btn>
            <v-btn dark color="blue">
              Facebook
            </v-btn>
            <v-btn dark color="teal">
              Twitter
            </v-btn>
          </div>
          <h2 class="mt-4 mb-4"> Or </h2>
        </v-flex>

        <v-flex mb-4 xs10 offset-xs1>
          <v-form ref="form" v-model="valid" lazy-validation>
            <!-- prepend-icon="person" -->
            <v-container>
              <v-layout>
                <v-flex xs12>
                  <v-text-field
                    v-model="userName"
                    :rules="userNameRules"
                    label="Username"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout>
                <v-flex xs12>
                  <v-text-field
                    v-model="password"
                    @click:append-icon="e1 ? 'visibility' : 'visibility_off'"
                    @click:append-icon-cb="() => (e1 = !e1)"
                    :type="e1 ? 'password' : 'text'"
                    name="input-10-1"
                    label="Enter your password"
                    hint="At least 8 characters"
                    min="8"
                    counter
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout>
                <v-flex xs6>

                </v-flex>
                <v-flex xs6 text-xs-right pa-0>
                  <v-btn
                    :disabled="!valid"
                    @click="submit"
                    dark color="primary"
                    large
                  >
                    Sign In
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-flex>
        <v-flex mt-5 xs12>
          <small>
            By signing-in, you agree to the GoodWill ende user Lincense Agreement and GoodWill Terms of Service and Honour Code and acknowledge the Privacy Policy
          </small>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        valid: true,
        userName: '',
        e1: false,
        password: '',
        userNameRules: [
          v => !!v || 'Username is required'
        ]
      }
    },
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          console.log('All is well.')
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  button {
    text-transform: capitalize;
    font-size: 120%;
  }
</style>
