<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue'

import UiTable from '@/components/ui-table.vue'
import { useOrderBookStore } from '@/stores/order-book'
import { useTickersStore } from '@/stores/tickers'

const orderBook = useOrderBookStore()
const tickersStore = useTickersStore()

const formattedBids = computed(() => {
  return orderBook.bids.map(([price, amount]) => ({
    price,
    amount,
    total: (Number.parseFloat(price) * Number.parseFloat(amount)).toFixed(8),
  }))
})
const formattedAsks = computed(() => {
  return orderBook.asks.map(([price, amount]) => ({
    price,
    amount,
    total: (Number.parseFloat(price) * Number.parseFloat(amount)).toFixed(8),
  }))
})
const bidsTitle = computed(() => `Bids - ${tickersStore.selectedTicker}`)
const asksTitle = computed(() => `Asks - ${tickersStore.selectedTicker}`)

onMounted(() => {
  orderBook.connectToStream(tickersStore.selectedTicker)
})

onBeforeUnmount(() => {
  orderBook.disconnectFromStream()
})
</script>

<template>
  <v-row>
    <v-col cols="6">
      <ui-table :items="formattedBids" :title="bidsTitle" />
    </v-col>
    <v-col cols="6">
      <ui-table :items="formattedAsks" :title="asksTitle" />
    </v-col>
  </v-row>
</template>
