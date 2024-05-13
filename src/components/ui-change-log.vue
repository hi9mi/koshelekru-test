<script setup lang="ts">
import type { Change } from '@/stores/tickers'

defineProps<{ changeLog: Change[] }>()
</script>

<template>
  <v-list dense>
    <v-list-item
      v-for="(log, index) in changeLog"
      :key="index"
    >
      <v-list-item-title>
        Changed from <strong>{{ log.previous }}</strong> to <strong>{{ log.current }}</strong>
      </v-list-item-title>
      <v-list-item-subtitle>
        Time: {{ log.date }}
      </v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>
