<script setup lang="ts">
import UiChangeLog from '@/components/ui-change-log.vue'
import { tickers, useTickersStore } from '@/stores/tickers'

const tickersStore = useTickersStore()
</script>

<template>
  <v-row>
    <v-col>
      <h1 class="text-h6 text-sm-h5 text-md-h4 text-lg-h3 mb-10">
        Settings
      </h1>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-select
        v-model="tickersStore.selectedTicker"
        label="Select a ticker"
        :items="tickers"
        variant="outlined"
        class="mb-10"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <h2 class="text-h6 text-sm-h5 text-md-h4 text-lg-h3">
        Change Log
      </h2>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" md="6" lg="4">
      <ui-change-log :change-log="tickersStore.changeLog" />
    </v-col>
  </v-row>
</template>
