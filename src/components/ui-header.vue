<script setup lang="ts">
import { useDisplay } from 'vuetify'

const { xs } = useDisplay()
</script>

<template>
  <v-app-bar :elevation="2" color="primary">
    <v-app-bar-title>
      <v-icon icon="$vuetify" />
    </v-app-bar-title>
    <v-spacer />
    <v-btn to="/settings" variant="text">
      <span class="d-none d-sm-inline">Settings</span>
      <v-icon
        icon="mdi-cog"
        :end="!xs"
      />
    </v-btn>
    <v-btn to="/order-book" variant="text">
      <span class="d-none d-sm-inline">Order Book</span>
      <v-icon icon="mdi-book" :end="!xs" />
    </v-btn>
  </v-app-bar>
</template>
