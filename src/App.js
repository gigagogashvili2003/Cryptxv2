import { Fragment, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HeaderTitle from "./components/Header/HeaderTitle";
import CoinsTable from "./components/Coins/CoinsTable";
import useHttp from "./hooks/useHttp";
import { getAllCoins } from "./lib/api";
import CoinDetail from "./components/Coins/CoinDetail";
import Filters from "./components/Filters/Filters";

function App() {
  const { sendRequest, data: coins, status, error } = useHttp(getAllCoins);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something Went Wrong</p>;
  }

  if (!coins && (!coins || coins.length === 0)) {
    return <p>No data Found!</p>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Fragment>
            <HeaderTitle />
            <Filters />
            <CoinsTable coins={coins} />
          </Fragment>
        }
      ></Route>
      <Route path="/coin/:coinId" element={<CoinDetail />}></Route>
    </Routes>
  );
}

export default App;
