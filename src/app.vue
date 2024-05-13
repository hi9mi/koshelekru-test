<script setup lang="ts">
import UiHeader from '@/components/ui-header.vue'
</script>

<template>
  <v-app>
    <ui-header />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
