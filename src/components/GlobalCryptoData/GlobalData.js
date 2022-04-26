import { useEffect, useState, Fragment } from "react";

import classes from "./GlobalData.module.css";
import GlobalDataCard from "./GlobalDataCard";
import { currencyFormatter } from "../../helpers/utils";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../UI/ErrorMessage";
import { commonActions } from "../../store/commonSlice";
import LoadingSpinner from "../UI/LoadingSpinner";
import { colorDetect } from "../../helpers/helpers";

const GlobalData = (props) => {
  const dispatch = useDispatch();
  const [globalData, setGlobalData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const isGloballyLoading = useSelector((state) => state.commons.globalLoading);

  useEffect(() => {
    const sendRequest = async () => {
      dispatch(commonActions.setGlobalLoading(true));
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
          dispatch(
            commonActions.setTotalPages(data?.data?.active_cryptocurrencies)
          );
          setGlobalData(transformedData);
          setIsLoading(false);
          dispatch(commonActions.setGlobalLoading(false));
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
  }, [dispatch]);

  if (isGloballyLoading && !error) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage errorMessage={error} />;
  }

  if (!isLoading && !globalData) {
    return <p>No Data Found!</p>;
  }

  const [destructuredData] = globalData;

  return (
    <Fragment>
      {!isGloballyLoading && (
        <section className={classes.section}>
          <GlobalDataCard
            className={colorDetect(destructuredData?.marketCapPercantage)}
            cardType="Market Capitalization"
            value={currencyFormatter(
              destructuredData?.totalMarketCap,
              "en-US",
              "usd",
              "currency",
              0
            )}
            colorDetector={destructuredData?.marketCapPercantage}
            percantage={destructuredData?.marketCapPercantage?.toFixed(1) + "%"}
          />
          <GlobalDataCard
            cardType="24h Trading Volume"
            value={currencyFormatter(
              destructuredData?.totalVolume,
              "en-US",
              "usd",
              "currency",
              0
            )}
            colorDetector={1}
          />
          <GlobalDataCard
            gray
            cardType="# Of Coins"
            value={destructuredData?.active}
            colorDetector={0}
          />
        </section>
      )}
    </Fragment>
  );
};

export default GlobalData;
