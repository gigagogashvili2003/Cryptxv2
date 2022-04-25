import { useEffect, useState } from "react";

import classes from "./GlobalData.module.css";
import GlobalDataCard from "./GlobalDataCard";
import { currencyFormatter } from "../../helpers/utils";
import axios from "axios";

const colorDetect = (price) => {
  let percantageColor;

  if (price < 0) {
    percantageColor = classes.redColor;
  } else {
    percantageColor = classes.greenColor;
  }

  return percantageColor;
};

const GlobalData = (props) => {
  const [globalData, setGlobalData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      axios
        .get("https://api.coingecko.com/api/v3/global")
        .then((res) => {
          const data = res.data;

          const transformedData = [];

          for (const key in data) {
            transformedData.push({
              active: data[key].active_cryptocurrencies,
              totalMarketCap: data[key].total_market_cap.usd,
              totalVolume: data[key].total_volume.usd,
              marketCapPercantage:
                data[key].market_cap_change_percentage_24h_usd,
            });
          }
          setGlobalData(transformedData);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
        });
    };
    try {
      sendRequest();
    } catch (err) {
      setError(err.message);
    }
  }, []);
  if (error) {
    return <p>Something Went Wrong</p>;
  }

  if (!isLoading && !globalData) {
    return <p>No Data Found!</p>;
  }

  const [destructuredData] = globalData;

  return (
    <section className={classes.section}>
      <GlobalDataCard
        className={colorDetect(destructuredData?.marketCapPercantage)}
        cardType="Market Capitalization"
        value={currencyFormatter(destructuredData?.totalMarketCap, "en-US", 0)}
        colorDetector={destructuredData?.marketCapPercantage}
      />
      <GlobalDataCard
        cardType="24h Trading Volume"
        value={currencyFormatter(destructuredData?.totalVolume, "en-US", 0)}
        colorDetector={1}
      />
      <GlobalDataCard
        gray
        cardType="# Of Coins"
        value={destructuredData?.active}
        colorDetector={0}
      />
    </section>
  );
};

export default GlobalData;
