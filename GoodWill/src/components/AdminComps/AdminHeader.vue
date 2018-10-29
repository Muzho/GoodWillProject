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
      <!-- <span class="hidden-sm-and-down">
        <router-link :to="'/'">Robert Muhereza</router-link>
      </span> -->
      <v-menu :nudge-width="100">
        <v-toolbar-title slot="activator">
          <span>Robert Muhereza</span>
          <v-icon dark>arrow_drop_down</v-icon>
        </v-toolbar-title>
        <v-list>
          <v-list-tile v-for="item in items" :key="item" @click="">
            <v-list-tile-title v-text="item"></v-list-tile-title>
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
        <!-- <v-divider></v-divider>
        <!- <v-list-tile :to="'/'" class="hidden-sm-and-above" exact>
          <v-list-tile-action>
            <v-icon>settings_power</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile> -->
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
        items: [
          'My Account', 'Messages', 'Log out'
        ],
        pages: [
          {
            pageName: 'Home',
            pageIcon: 'dashboard',
            pageUrl: '/Dashboard'
          },
          {
            pageName: 'Land',
            pageIcon: 'terrain',
            pageUrl: '/Land'
          },
          {
            pageName: 'Houses',
            pageIcon: 'business',
            pageUrl: '/Houses'
          },
          {
            pageName: 'Cars',
            pageIcon: 'directions_car',
            pageUrl: '/Cars'
          },
          {
            pageName: 'Features & Facilities',
            pageIcon: 'all_inclusive',
            pageUrl: '/Cars'
          },
          {
            pageName: 'Locality',
            pageIcon: 'place',
            pageUrl: '/Cars'
          },
          {
            pageName: 'Customers',
            pageIcon: 'group',
            pageUrl: '/Cars'
          },
          {
            pageName: 'Agents',
            pageIcon: 'supervisor_account',
            pageUrl: '/Cars'
          }
        ]
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
</style>
