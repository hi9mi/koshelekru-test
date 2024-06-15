<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { useDisplay } from 'vuetify'

import UiTable from '@/components/ui-table.vue'
import { useOrderBookStore } from '@/stores/order-book'
import { useTickersStore } from '@/stores/tickers'

const orderBook = useOrderBookStore()
const tickersStore = useTickersStore()
const { smAndDown } = useDisplay()

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
const headers = computed(() => {
  return smAndDown.value
    ? [{ title: 'Price', key: 'price' }, { title: 'Total', key: 'total' }]
    : [{ title: 'Price', key: 'price' }, { title: 'Amount', key: 'amount' }, { title: 'Total', key: 'total' }]
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
    <v-col sm="6" cols="12">
      <ui-table
        :headers="headers"
        :items="formattedBids"
        :title="bidsTitle"
        :loading="orderBook.isConnectingToStream"
        unique-key="price"
      />
    </v-col>
    <v-col sm="6" cols="12">
      <ui-table
        :headers="headers"
        :items="formattedAsks"
        :title="asksTitle"
        :loading="orderBook.isConnectingToStream"
        unique-key="price"
      />
    </v-col>
  </v-row>
</template>
