import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import HeaderTitle from "./components/Header/HeaderTitle";
import CoinsTable from "./components/Coins/CoinsTable";
import CoinDetail from "./components/Coins/CoinDetail";
import Filters from "./components/Filters/Filters";
import GlobalData from "./components/GlobalCryptoData/GlobalData";
import Pagination from "./components/Pagination/Pagination";
import { useSelector } from "react-redux";

function App() {
  const isGlobalLoading = useSelector((state) => state.commons.globalLoading);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Fragment>
            {!isGlobalLoading && <HeaderTitle />}
            <GlobalData />
            {!isGlobalLoading && <Filters />}
            <CoinsTable />
            {!isGlobalLoading && <Pagination />}
          </Fragment>
        }
      ></Route>
      <Route path="/coin/:coinId" element={<CoinDetail />}></Route>
    </Routes>
  );
}

export default App;
