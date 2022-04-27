import { Fragment, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import HeaderTitle from "./components/Header/HeaderTitle";
import CoinsTable from "./components/Coins/CoinsTable";
import CoinDetail from "./components/Coins/CoinDetail";
import Filters from "./components/Filters/Filters";
import GlobalData from "./components/GlobalCryptoData/GlobalData";
import Pagination from "./components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "./components/UI/NotFound";
import axios from "axios";
import { commonActions } from "./store/commonSlice";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import ErrorMessage from "./components/UI/ErrorMessage";

function App() {
  const [globalData, setGlobalData] = useState([]);
  const [coinsData, setCoinsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const curPage = useSelector((state) => state.commons.curPage);

  // Sending 2 different api request at same time
  useEffect(() => {
    const sendRequest = async (page) => {
      setIsLoading(true);
      Promise.all([
        axios(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=true&price_change_percentage=1h%2C7d`
        ),
        axios("https://api.coingecko.com/api/v3/global"),
      ])
        .then((response) => {
          // Getting data from response
          const coinsData = response[0]?.data;
          const globalData = response[1]?.data?.data;

          // Transforming them as i want
          const transformedCoins = [];

          for (const key in coinsData) {
            transformedCoins.push({
              id: coinsData[key]?.id,
              coinName: coinsData[key]?.name,
              imageSrc: coinsData[key]?.image,
              shortName: coinsData[key]?.symbol,
              price: coinsData[key]?.current_price,
              priceChange24Hour: coinsData[key]?.price_change_percentage_24h,
              marketCap: coinsData[key]?.market_cap,
              totalVolume: coinsData[key]?.total_volume,
              priceChangeHour:
                coinsData[key]?.price_change_percentage_1h_in_currency,
              priceChange7Days:
                coinsData[key]?.price_change_percentage_7d_in_currency,
            });
          }
          setCoinsData(transformedCoins);

          const transformedGlobalData = [];

          transformedGlobalData.push({
            active: globalData?.active_cryptocurrencies,
            totalMarketCap: globalData?.total_market_cap?.usd,
            totalVolume: globalData?.total_volume.usd,
            marketCapPercantage:
              globalData?.market_cap_change_percentage_24h_usd,
          });

          setGlobalData(transformedGlobalData);
          dispatch(
            commonActions.setTotalPages(transformedGlobalData[0].active)
          );

          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
        });
    };

    try {
      sendRequest(curPage);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, [curPage, dispatch]);

  // Checking states

  if (error) {
    return <ErrorMessage errorMessage={error} />;
  }

  if (isLoading && !error) {
    return <LoadingSpinner />;
  }

  if (
    !isLoading &&
    (!globalData ||
      !coinsData ||
      globalData?.length === 0 ||
      coinsData?.length === 0)
  ) {
    return <p>No Data Found!</p>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Fragment>
            <HeaderTitle />
            <GlobalData
              globalState={{
                globalData,
                isLoading,
                error,
              }}
            />
            <Filters />
            <CoinsTable
              coinsState={{
                coins: coinsData,
                isLoading,
                error,
              }}
            />
            <Pagination />
          </Fragment>
        }
      ></Route>
      <Route path="/coin/:coinId" element={<CoinDetail />}></Route>
      <Route path="/*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
