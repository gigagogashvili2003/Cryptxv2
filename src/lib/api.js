import axios from "axios";

// All the actual api request functions

export const getAllCoins = async (page) => {
  const res = await axios(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=true&price_change_percentage=1h%2C7d`
  );

  const data = res.data;

  const transformedCoins = [];

  for (const key in data) {
    transformedCoins.push({
      id: data[key].id,
      coinName: data[key].name,
      imageSrc: data[key].image,
      shortName: data[key].symbol,
      price: data[key].current_price,
      priceChange24Hour: data[key].price_change_percentage_24h,
      marketCap: data[key].market_cap,
      totalVolume: data[key].total_volume,
      priceChangeHour: data[key].price_change_percentage_1h_in_currency,
      priceChange7Days: data[key].price_change_percentage_7d_in_currency,
    });
  }

  return transformedCoins;
};

export const getCoinDetail = async (coinId) => {
  const res = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=false
    `
  );

  const data = res.data;

  const transformedCoinDetails = [];

  transformedCoinDetails.push({
    id: data.id,
    name: data.name,
    image: data.image.large,
    coingeckoRank: data.coingecko_rank,
    marketCapRank: data.market_cap_rank,
    description: data.description.en,
    shortName: data.symbol,
    allTimeHigh: data.market_data.ath.usd,
    allTimeHighChangePercantage: data.market_data.ath_change_percentage.usd,
    allTimeHighDate: data.market_data.ath_date.usd,
    allTimeLow: data.market_data.atl.usd,
    allTimeLowChangePercantage: data.market_data.atl_change_percentage.usd,
    allTimeLowDate: data.market_data.atl_date.usd,
    circulatingSupply: data.market_data.circulating_supply,
    price: data.market_data.current_price.usd,
    marketCap: data.market_data.market_cap.usd,
    low24: data.market_data.low_24h.usd,
    high24: data.market_data.high_24h.usd,
    totalVolume: data.market_data.total_volume.usd,
    totalSupply: data.market_data.total_supply,
    maxSupply: data.market_data.max_supply,
    priceChange24Hour: data.market_data.price_change_percentage_24h,
    priceChange24HourCurrency:
      data.market_data.price_change_24h_in_currency.usd,
    fullyValuation: data.market_data.fully_diluted_valuation.usd,
    website: data.links.homepage[0],
    blockchair: data.links.blockchain_site.find((link) =>
      link.includes("blockchair")
    ),
    sourceCode: data.links.repos_url.github[0],
    officialForum: data.links.official_forum_url[0],
    hashAlgorithm: data.hashing_algorithm,
    priceChange7Days: data.market_data.price_change_percentage_7d,
    priceChange7DaysCurrency:
      data.market_data.price_change_percentage_7d_in_currency.usd,
    priceChange14Days: data.market_data.price_change_percentage_14d,
    priceChange14DaysCurrency:
      data.market_data.price_change_percentage_14d_in_currency.usd,
    priceChange30Days: data.market_data.price_change_percentage_30d,
    priceChange30DaysCurrency:
      data.market_data.price_change_percentage_30d_in_currency.usd,
    priceChange60Days: data.market_data.price_change_percentage_60d,
    priceChange60DaysCurrency:
      data.market_data.price_change_percentage_60d_in_currency.usd,
    priceChange200Days: data.market_data.price_change_percentage_200d,
    priceChange200DaysCurrency:
      data.market_data.price_change_percentage_200d_in_currency.usd,
    priceChange1Year: data.market_data.price_change_percentage_1y,
    priceChange1YearCurrency:
      data.market_data.price_change_percentage_1y_in_currency.usd,
  });

  return transformedCoinDetails;
};
