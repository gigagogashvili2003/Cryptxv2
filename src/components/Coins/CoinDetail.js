import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import classes from "./CoinDetail.module.css";
import { getCoinDetail } from "../../lib/api";
import {
  currencyFormatter,
  timeFormat,
  calculateTime,
} from "../../helpers/utils";
import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorMessage from "../UI/ErrorMessage";

const CoinDetail = (props) => {
  const { coinId } = useParams();

  const {
    sendRequest: getCoinDetails,
    data: loadedCoinDetail,
    status,
    error,
  } = useHttp(getCoinDetail);

  useEffect(() => {
    getCoinDetails(coinId);
  }, [getCoinDetails, coinId]);

  if (status === "pending" && !error) {
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

  console.log(loadedDetails);
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

  return (
    <main className={classes.main}>
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
            <span>{loadedDetails?.priceChange24Hour?.toFixed(1)}%</span>
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
                      loadedDetails?.fullyValuation,
                      "en-US",
                      "usd",
                      "currency",
                      2
                    )}
                  </span>
                </li>
              </ul>
            </div>
            <div className={classes.marketCapRight}>
              <ul>
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
                <p>{loadedDetails?.hashAlgorithm}</p>
              </li>
              <li>
                <span>Source Code</span>
                <a href={loadedDetails?.sourceCode}>Github</a>
              </li>
            </ul>
          </div>
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
                    <p>
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
                    <p>
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
