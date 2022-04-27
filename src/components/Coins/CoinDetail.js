import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import classes from "./CoinDetail.module.css";

// Api Functions
// Helper Functions
import { colorDetect } from "../../helpers/helpers";
import {
  currencyFormatter,
  timeFormat,
  calculateTime,
} from "../../helpers/utils";

// Component imports
import BackToHomeButton from "../Button/BackToHomeButton";
import ErrorMessage from "../UI/ErrorMessage";
import LoadingSpinner from "../UI/LoadingSpinner";

const CoinDetail = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadedCoinDetail, setLoadedCoinDetail] = useState([]);

  const { coinId } = useParams();

  // Sending request to suitable coin
  useEffect(() => {
    const sendRequest = (coinId) => {
      setIsLoading(true);
      axios(
        `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=false
        `
      )
        .then((res) => {
          const data = res.data;

          // Transforming data as i want

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
            allTimeHighChangePercantage:
              data.market_data.ath_change_percentage.usd,
            allTimeHighDate: data.market_data.ath_date.usd,
            allTimeLow: data.market_data.atl.usd,
            allTimeLowChangePercantage:
              data.market_data.atl_change_percentage.usd,
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

          setLoadedCoinDetail(transformedCoinDetails);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
        });
    };

    try {
      sendRequest(coinId);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, [coinId]);

  // Checking states

  if (error) {
    return <ErrorMessage errorMessage={error} />;
  }

  if (isLoading && !error) {
    return <LoadingSpinner />;
  }

  if (!isLoading && (!loadedCoinDetail || loadedCoinDetail?.length === 0)) {
    return <p>No Data Found!</p>;
  }

  const loadedDetails = loadedCoinDetail ? loadedCoinDetail[0] : null;

  // creating reusable variables

  const fixedPrice = currencyFormatter(
    loadedDetails?.price,
    "en-US",
    "usd",
    "currency",
    2
  );

  const fixedMarketCap = currencyFormatter(
    loadedDetails?.marketCap,
    "en-US",
    "usd",
    "currency",
    0
  );

  const fixedVolume = currencyFormatter(
    loadedDetails?.totalVolume,
    "en-US",
    "usd",
    "currency",
    2
  );

  const fixedHigh24 = currencyFormatter(
    loadedDetails?.high24,
    "en-us",
    "usd",
    "currency",
    2
  );

  const fixedLow24 = currencyFormatter(
    loadedDetails?.low24,
    "en-us",
    "usd",
    "currency",
    2
  );

  // Reusable functions

  const priceChange24Hour = (price) => {
    return <span className={colorDetect(price)}>{price?.toFixed(1)}%</span>;
  };
  const priceChange24HourCurrency = (price) => {
    return (
      <span className={colorDetect(price)}>
        {currencyFormatter(price, "en-US", "usd", "currency")}
      </span>
    );
  };

  return (
    <main className={classes.main}>
      <div>
        <BackToHomeButton />
      </div>
      <div className={classes.coinContent}>
        <div className={classes.coinLeftContent}>
          <div className={classes.ranking}>
            Rank #{loadedDetails?.coingeckoRank}
          </div>
          <div className={classes.coinHeaderContent}>
            <img src={loadedDetails?.image} alt="" />
            <h2>{loadedDetails?.name}</h2>
            <h2>({loadedDetails?.shortName?.toUpperCase()})</h2>
          </div>
          <div className={classes.price}>
            <h2>{fixedPrice}</h2>
            {priceChange24Hour(loadedDetails?.priceChange24Hour)}
            {priceChange24HourCurrency(
              loadedDetails?.priceChange24HourCurrency
            )}
          </div>
          <div className={classes.priceRange}>
            <p>{fixedLow24}</p>
            <span>24H Range</span>
            <p>{fixedHigh24}</p>
          </div>
          <div className={classes.marketCap}>
            <div className={classes.marketCapLeft}>
              <ul>
                <li>
                  <span>Market Cap</span> <span>{fixedMarketCap}</span>
                </li>
                <li>
                  <span>24H Trading Vol</span> <span>{fixedVolume}</span>
                </li>
                <li>
                  <span>Fully Diluted Valuation</span>{" "}
                  <span>
                    {currencyFormatter(
                      loadedDetails?.fullyValuation || 0,
                      "en-US",
                      "usd",
                      "currency",
                      2
                    )}
                  </span>
                </li>
                <li>
                  <span>Circulating Supply</span>{" "}
                  <span>
                    {currencyFormatter(
                      loadedDetails?.circulatingSupply,
                      "en-US",
                      undefined,
                      undefined,
                      0
                    )}
                  </span>
                </li>
                <li>
                  <span>Total Supply</span>{" "}
                  <span>
                    {currencyFormatter(
                      loadedDetails?.totalSupply,
                      "en-US",
                      undefined,
                      undefined,
                      0
                    )}
                  </span>
                </li>
                <li>
                  <span>Max Supply</span>{" "}
                  <span>
                    {currencyFormatter(
                      loadedDetails?.maxSupply,
                      "en-US",
                      undefined,
                      undefined,
                      0
                    )}
                  </span>
                </li>
              </ul>
            </div>
            <div className={classes.marketCapRight}>
              <ul></ul>
            </div>
          </div>
        </div>
        <div className={classes.coinRightContent}>
          <h2>Info</h2>
          <div className={classes.infoContent}>
            <ul>
              <li>
                <span>Website</span>
                <a href={loadedDetails?.website}>Official Website</a>
              </li>
              <li>
                <span>Explore</span>
                <a href={loadedDetails?.blockchair}>Blockchair</a>
              </li>
              <li>
                <span>Forum</span>
                <a href={loadedDetails?.officialForum}>Official Forum</a>
              </li>
              <li>
                <span>Hash Algorithm</span>
                <p>{loadedDetails?.hashAlgorithm || "Not Found"}</p>
              </li>
              <li>
                <span>Source Code</span>
                <a href={loadedDetails?.sourceCode}>Github</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={classes.priceChange}>
        <h2>Price Change</h2>
        <div className={classes.priceChangeList}>
          <ul>
            <li>
              <p>24h</p>
              {priceChange24Hour(loadedDetails?.priceChange24Hour)}
              {priceChange24HourCurrency(
                loadedDetails?.priceChange24HourCurrency
              )}
            </li>
            <li>
              <p>7d</p>
              {priceChange24Hour(loadedDetails?.priceChange7Days)}
              {priceChange24HourCurrency(
                loadedDetails?.priceChange7DaysCurrency
              )}
            </li>
            <li>
              <p>14d</p>
              {priceChange24Hour(loadedDetails?.priceChange14Days)}
              {priceChange24HourCurrency(
                loadedDetails?.priceChange14DaysCurrency
              )}
            </li>
            <li>
              <p>30d</p>
              {priceChange24Hour(loadedDetails?.priceChange30Days)}
              {priceChange24HourCurrency(
                loadedDetails?.priceChange30DaysCurrency
              )}
            </li>
            <li>
              <p>60d</p>
              {priceChange24Hour(loadedDetails?.priceChange60Days)}
              {priceChange24HourCurrency(
                loadedDetails?.priceChange60DaysCurrency
              )}
            </li>
            <li>
              <p>200d</p>
              {priceChange24Hour(loadedDetails?.priceChange200Days)}
              {priceChange24HourCurrency(
                loadedDetails?.priceChange200DaysCurrency
              )}
            </li>
            <li>
              <p>1y</p>
              {priceChange24Hour(loadedDetails?.priceChange1Year)}
              {priceChange24HourCurrency(
                loadedDetails?.priceChange1YearCurrency
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className={classes.coinPrice}>
        <div className={classes.priceStats}>
          <div className={classes.titles}>
            <h2>{loadedDetails?.shortName?.toUpperCase()} Price Statistics</h2>
            <p>{loadedDetails?.name} Price Today</p>
          </div>
          <div className={classes.content}>
            <ul>
              <li>
                <p>Bitcoin Price</p>
                <span>{fixedPrice}</span>
              </li>
              <li>
                <p>Market Cap</p>
                <span>{fixedMarketCap}</span>
              </li>
              <li>
                <p>Trading Volume</p>
                <span>{fixedVolume}</span>
              </li>
              <li>
                <p>Volume / Market Cap</p>
                <span>
                  {(
                    loadedDetails?.totalVolume / loadedDetails?.marketCap
                  )?.toFixed(4)}
                </span>
              </li>
              <li>
                <p>24h Low / 24h High</p>
                <span>
                  {fixedLow24} / {fixedHigh24}
                </span>
              </li>
              <li>
                <p>Market Cap Rank</p>
                <span>#{loadedDetails?.marketCapRank}</span>
              </li>
              <li>
                <p>All-Time High</p>
                <div className={classes.allTimeContent}>
                  <div className={classes.allTimePrice}>
                    <h3>
                      {currencyFormatter(
                        loadedDetails?.allTimeHigh,
                        "en-US",
                        "usd",
                        "currency",
                        2
                      )}
                    </h3>
                    <p
                      className={colorDetect(
                        loadedDetails?.allTimeHighChangePercantage
                      )}
                    >
                      {loadedDetails?.allTimeHighChangePercantage?.toFixed(1)}%
                    </p>
                  </div>
                  <div className={classes.allTimeDate}>
                    <time>
                      {timeFormat(loadedDetails?.allTimeHighDate)} (
                      {calculateTime(loadedDetails?.allTimeHighDate)} Months)
                    </time>
                  </div>
                </div>
              </li>
              <li>
                <p>All-Time Low</p>
                <div className={classes.allTimeContent}>
                  <div className={classes.allTimePrice}>
                    <h3>
                      {currencyFormatter(
                        loadedDetails?.allTimeLow,
                        "en-US",
                        "usd",
                        "currency",
                        2
                      )}
                    </h3>
                    <p
                      className={colorDetect(
                        loadedDetails?.allTimeLowChangePercantage
                      )}
                    >
                      {loadedDetails?.allTimeLowChangePercantage?.toFixed(1)}%
                    </p>
                  </div>
                  <div className={classes.allTimeDate}>
                    <time>
                      {timeFormat(loadedDetails?.allTimeLowDate)} (
                      {calculateTime(loadedDetails?.allTimeLowDate)} Months)
                    </time>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CoinDetail;
