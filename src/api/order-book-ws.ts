import type { PriceLevelAndAmount } from './get-order-book-snapshot'

export interface BookOrderStreamData {
  e: string
  E: number
  s: string
  U: number
  u: number
  b: PriceLevelAndAmount[]
  a: PriceLevelAndAmount[]
}

export class OrderBookWs {
  private ws: WebSocket | null = null

  constructor(private ticker: string) {}

  public connectToStream({
    handler,
    onOpen,
  }: {
    handler: (data: BookOrderStreamData) => void
    onOpen: () => Promise<void>
  }) {
    if (this.ws)
      this.disconnectFromStream()

    this.ws = new WebSocket(`wss://stream.binance.com:9443/ws/${this.ticker.toLowerCase()}@depth`)

    this.ws.onopen = async () => {
      await onOpen()
    }

    this.ws.onmessage = async (event) => {
      const depthEvent = JSON.parse(event.data) as BookOrderStreamData
      handler(depthEvent)
    }

    this.ws.onerror = (error) => {
      console.error(`WebSocket error for ${this.ticker}:`, error)
    }
  }

  public disconnectFromStream() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }
}
