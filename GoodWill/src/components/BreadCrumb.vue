<template>
    <v-breadcrumbs id="breadCrumb" mt-3 mb-3>
      <v-icon slot="divider">chevron_right</v-icon>
      <v-breadcrumbs-item v-for="item in items" :key="item.text" :disabled="item.disabled">
        <router-link v-bind:to="item.pageUrl" exact> {{ item.text }}</router-link>
      </v-breadcrumbs-item>
    </v-breadcrumbs>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style scoped>
  a {
    text-decoration: none;
  }
  .router-link-active{
    color: #808080;
  }
</style>
