import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "./CoinDetail.module.css";

// Api Functions
import useHttp from "../../hooks/useHttp";
import { getCoinDetail } from "../../lib/api";

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
  const isGloballyLoading = useSelector((state) => state.commons.globalLoading);

  // Getting coinId from url with useParams
  const { coinId } = useParams();

  // Getting all the data what i need from usehttp
  const {
    sendRequest: getCoinDetails,
    data: loadedCoinDetail,
    status,
    error,
  } = useHttp(getCoinDetail);

  // Sending request
  useEffect(() => {
    getCoinDetails(coinId);
  }, [getCoinDetails, coinId]);

  // Checking States
  if (isGloballyLoading && !error) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage errorMessage={error} />;
  }

  if (
    status === "completed" &&
    (!loadedCoinDetail || loadedCoinDetail.length === 0) &&
    !error
  ) {
    return <p>Data not Found!</p>;
  }

  const loadedDetails = loadedCoinDetail ? loadedCoinDetail[0] : null;

  // Reusable variables
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

  const priceChangeData = [
    ["24h", loadedDetails?.priceChange24Hour, loadedDetails?.priceChange24HourCurrency],
    ["7d", loadedDetails?.priceChange7Days, loadedDetails?.priceChange7DaysCurrency],
    ["14d", loadedDetails?.priceChange14Days, loadedDetails?.priceChange14DaysCurrency],
    ["30d", loadedDetails?.priceChange30Days, loadedDetails?.priceChange30DaysCurrency],
    ["60d", loadedDetails?.priceChange60Days, loadedDetails?.priceChange60DaysCurrency],
    ["200d", loadedDetails?.priceChange200Days, loadedDetails?.priceChange200DaysCurrency],
    ["1y", loadedDetails?.priceChange1Year, loadedDetails?.priceChange1YearCurrency],
  ];

  const marketCapData = [
    ["Market Cap", loadedDetails?.marketCap, "usd", "currency", 2],
    ["24H Trading Vol", loadedDetails?.totalVolume, "usd", "currency", 2],
    ["Fully Diluted Valuation", loadedDetails?.fullyValuation, "usd", "currency", 2],
    ["Circulating Supply", loadedDetails?.circulatingSupply, undefined, undefined, 0],
    ["Total Supply", loadedDetails?.totalSupply, undefined, undefined, 0],
    ["Max Supply", loadedDetails?.maxSupply, undefined, undefined, 0],
  ];

  const infoData = [
    ["Website", loadedDetails?.website, "Official Website"],
    ["Explore", loadedDetails?.blockchair, "Blockchair"],
    ["Forum", loadedDetails?.officialForum, "Official Forum"],
    ["Source Code", loadedDetails?.website, "Github"],
  ];

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
                {marketCapData?.map((item, i) => (
                  <li key={i}>
                    <span>{item[0]}</span>{" "}
                    <span>
                      {currencyFormatter(
                        item[1] || 0,
                        "en-US",
                        item[2],
                        item[3],
                        item[4]
                      )}
                    </span>
                  </li>
                ))}
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
              {infoData?.map((item, i) => (
                <li key={i}>
                  <span>{item[0]}</span>
                  <a href={item[1]}>{item[2]}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={classes.priceChange}>
        <h2>Price Change</h2>
        <div className={classes.priceChangeList}>
          <ul>
            {priceChangeData?.map((item, i) => (
              <li key={i}>
                <p>{item[0]}</p>
                {priceChange24Hour(item[1] || 0)}
                {priceChange24HourCurrency(item[2] || 0)}
              </li>
            ))}
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
