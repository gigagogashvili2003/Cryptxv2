import axios from "axios";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "../../store/commonSlice";

import classes from "./GlobalData.module.css";

// Helper funs
import { colorDetect } from "../../helpers/helpers";
import { currencyFormatter } from "../../helpers/utils";

// Component imports
import GlobalDataCard from "./GlobalDataCard";
import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorMessage from "../UI/ErrorMessage";

const GlobalData = ({ globalState }) => {
  // Getting data throught props
  const { globalData, isLoading, error } = globalState;

  // destructured data
  const [destructuredData] = globalData;

  // Checking states

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage errorMessage={error} />;
  }

  if (!isLoading && (!globalData || globalData?.length === 0)) {
    return <p>No Data Found!</p>;
  }

  return (
    <Fragment>
      {
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
      }
    </Fragment>
  );
};

export default GlobalData;
