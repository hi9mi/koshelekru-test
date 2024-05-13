import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'

import { getOrderBookSnapshot as apiGetOrderBookSnapshot, type PriceLevelAndAmount } from '@/api/get-order-book-snapshot'
import { type BookOrderStreamData, OrderBookWs } from '@/api/order-book-ws'

export const useOrderBookStore = defineStore('orderBook', () => {
  const lastUpdateId = ref(0)
  const bids = shallowRef<PriceLevelAndAmount[]>([])
  const asks = shallowRef<PriceLevelAndAmount[]>([])

  const asksMap = new Map<string, string>()
  const bidsMap = new Map<string, string>()
  let orderBookWs: OrderBookWs | null = null

  async function connectToStream(ticker: string) {
    if (orderBookWs)
      disconnectFromStream()

    orderBookWs = new OrderBookWs(ticker)
    orderBookWs.connectToStream({
      handler,
      onOpen: () => getOrderBookSnapshot(ticker),
    })
  }

  function disconnectFromStream() {
    if (orderBookWs) {
      orderBookWs.disconnectFromStream()
      orderBookWs = null
    }
  }

  function handler(data: BookOrderStreamData) {
    const { u, b, a, U } = data

    if (u <= lastUpdateId.value)
      return

    if (U <= lastUpdateId.value + 1 && u >= lastUpdateId.value + 1) {
      updateOrderBook(b, a)
      lastUpdateId.value = u
    }
  }

  function updatePriceLevel(orderBookMap: Map<string, string>, price: string, amount: string) {
    const mtn = Number.parseFloat(amount)

    if (mtn === 0)
      orderBookMap.delete(price)
    else
      orderBookMap.set(price, amount)
  }

  function updateOrderBook(newBids: PriceLevelAndAmount[], newAsks: PriceLevelAndAmount[]) {
    const updateBook = (newEntries: PriceLevelAndAmount[], bookMap: Map<string, string>) => {
      newEntries.forEach(([price, amount]) => updatePriceLevel(bookMap, price, amount))
    }

    updateBook(newBids, bidsMap)
    updateBook(newAsks, asksMap)

    bids.value = [...bidsMap.entries()].slice(0, 1000)
    asks.value = [...asksMap.entries()].slice(0, 1000)
  }

  async function getOrderBookSnapshot(ticker: string) {
    try {
      const snapshot = await apiGetOrderBookSnapshot(ticker)
      lastUpdateId.value = snapshot.lastUpdateId
      bids.value = snapshot.bids
      asks.value = snapshot.asks
    }
    catch (error) {
      console.error(error)
    }
  }

  return {
    connectToStream,
    disconnectFromStream,
    bids,
    asks,
  }
})
