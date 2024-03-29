const CoinList = (currency: string = "usd"): string =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

const SingleCoin = (id: string = "bitcoin"): string =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

const HistoricalChart = (id: string = "bitcoin", days: number = 365, currency: string = "usd"): string =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

const TrendingCoins = (currency: string = "usd"): string =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;


export { CoinList, SingleCoin, HistoricalChart, TrendingCoins };