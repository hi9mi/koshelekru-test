<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <v-row>
    <v-col>
      <h1 class="text-h4  text-center text-error mb-5">
        Error: Page not found
      </h1>
      <p class="text-center text-info">
        No match for <u>{{ route.path }}</u> 😕
      </p>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-btn color="primary" to="/order-book" variant="text" class="d-flex mx-auto w-max">
        Go to order book
      </v-btn>
    </v-col>
  </v-row>
</template>

<style scoped>
.w-max {
  max-width: max-content;
}
</style>
