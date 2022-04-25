import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import HeaderTitle from "./components/Header/HeaderTitle";
import CoinsTable from "./components/Coins/CoinsTable";
import CoinDetail from "./components/Coins/CoinDetail";
import Filters from "./components/Filters/Filters";
import GlobalData from "./components/GlobalCryptoData/GlobalData";
import Pagination from "./components/Pagination/Pagination";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Fragment>
            <HeaderTitle />
            <GlobalData />
            <Filters />
            <CoinsTable />
            <Pagination />
          </Fragment>
        }
      ></Route>
      <Route path="/coin/:coinId" element={<CoinDetail />}></Route>
    </Routes>
  );
}

export default App;
