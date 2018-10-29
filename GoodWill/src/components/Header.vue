<template>
  <div class="app-header">
    <v-toolbar flat dark color="primary" fixed app :clipped-left="clipped" id="app-menu">
      <v-toolbar-side-icon
        @click.stop="leftDrawer = !leftDrawer"
         dark
         ></v-toolbar-side-icon>
      <v-toolbar-title class="hidden-sm-and-down">
        <router-link v-text="companyBrand" :to="'/Dashboard'" exact></router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu :nudge-width="100" v-if="$store.getters.isUserLoggedIn">
        <v-toolbar-title slot="activator">
          <span class="user_name">Hello {{ $store.state.user.fname }} {{ $store.state.user.lname }}</span>
          <v-icon dark>arrow_drop_down</v-icon>
        </v-toolbar-title>
        <v-list>
          <v-list-tile v-bind:to="{path: '/singleUserAccount'}" exact>
            <v-list-tile-title>My Account</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="logout">
            <v-list-tile-title>Log Out</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-navigation-drawer
      temporary
      :left="left"
      v-model="leftDrawer"
      fixed
      class="primary"
    >
      <v-toolbar flat id="toolBar">
        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title v-text="companyBrand"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list>
        <v-divider></v-divider>
        <v-list-tile v-for="page in pages" :key="page.pageName" :to="page.pageUrl" exact>
          <v-list-tile-action>
            <v-icon>{{ page.pageIcon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ page.pageName }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        clipped: false,
        drawer: true,
        miniVariant: false,
        left: true,
        leftDrawer: false,
        companyBrand: 'GoodWill',
        pages: [
          {
            pageName: 'Home',
            pageIcon: 'dashboard',
            pageUrl: '/Dashboard'
          },
          {
            pageName: 'Properties',
            pageIcon: 'terrain',
            pageUrl: '/Land'
          },
          {
            pageName: 'Cars',
            pageIcon: 'directions_car',
            pageUrl: '/Cars'
          },
          {
            pageName: 'Features & Facilities',
            pageIcon: 'all_inclusive',
            pageUrl: '/FeatureFacility'
          },
          {
            pageName: 'Locality',
            pageIcon: 'place',
            pageUrl: '/Locality'
          },
          {
            pageName: 'Property Ownership',
            pageIcon: 'group',
            pageUrl: '/Ownership'
          }
        ]
      }
    },
    computed: {
      isUserLoggedIn: function () { return this.$store.getters.isUserLoggedIn }
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
          .then(() => {
            this.$router.push('/')
          })
      }
    }
  }
</script>

<style scoped>
  a {
    text-decoration: none;
    color: #FFF;
  }
  .navigation-drawer > .list {
    list-style-type: none;
  }
  .navigation-drawer > .list .list__tile--active .list__tile__title, .navigation-drawer > .list .list__tile--active .list__tile__action {
    color: #00897B;
  }
  .user_name {
    font-size: 80%;
  }
</style>
