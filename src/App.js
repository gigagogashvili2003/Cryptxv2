import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import HeaderTitle from "./components/Header/HeaderTitle";
import CoinsTable from "./components/Coins/CoinsTable";
import CoinDetail from "./components/Coins/CoinDetail";
import Filters from "./components/Filters/Filters";
import GlobalData from "./components/GlobalCryptoData/GlobalData";
import Pagination from "./components/Pagination/Pagination";
import { useSelector } from "react-redux";
import NotFound from "./components/UI/NotFound";

function App() {
  const isGlobalLoading = useSelector((state) => state.commons.globalLoading);
  console.log("hekl");
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
      <Route path="/*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
