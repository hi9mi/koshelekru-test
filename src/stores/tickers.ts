import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

import { formatDate } from '@/libs/format-date'

export interface Change {
  previous: string
  current: string
  date: string
}

export const tickers = ['BTCUSDT', 'BNBBTC', 'ETHBTC']
export const defaultTicker = tickers[0]

export const useTickersStore = defineStore('tickers', () => {
  const changeLog = ref<Change[]>([])
  const selectedTicker = ref<typeof tickers[number]>(defaultTicker)

  watch(selectedTicker, async (_selected, _previous) => {
    changeLog.value.push({ previous: _previous, current: _selected, date: formatDate(new Date()) })
  })

  return { selectedTicker, changeLog }
})
