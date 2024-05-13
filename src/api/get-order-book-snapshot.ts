export type PriceLevelAndAmount = [string, string]

export interface GetOrderBookSnapshot {
  asks: PriceLevelAndAmount[]
  bids: PriceLevelAndAmount[]
  lastUpdateId: number
}

export async function getOrderBookSnapshot(tickers: string) {
  const res = await fetch(`https://api.binance.com/api/v3/depth?symbol=${tickers}&limit=1000`)
  return res.json() as Promise<GetOrderBookSnapshot>
}
