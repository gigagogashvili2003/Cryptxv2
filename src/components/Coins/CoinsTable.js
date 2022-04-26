import { useEffect } from "react";
import classes from "./CoinsTable.module.css";
import CoinItem from "./CoinItem";
import { useSelector } from "react-redux";
import useHttp from "../../hooks/useHttp";
import { getAllCoins } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorMessage from "../UI/ErrorMessage";

const CoinsTable = (props) => {
  const { searchQuery, sortQuery, priceFrom, priceTo } = useSelector(
    (state) => state.filters.filterState
  );

  const isGloballyLoading = useSelector((state) => state.commons.globalLoading);

  const curPage = useSelector((state) => state.commons.curPage);

  const { sendRequest, data: coins, status, error } = useHttp(getAllCoins);

  useEffect(() => {
    sendRequest(curPage);
  }, [sendRequest, curPage]);

  if ((status === "pending" || isGloballyLoading) && !error) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage errorMessage={error} />;
  }

  if (status === "completed" && (!coins || coins?.length === 0)) {
    return <p>No data Found!</p>;
  }

  const sorting = (data) => {
    return data?.sort((a, b) => {
      if (sortQuery === "Asc") {
        return a.coinName.localeCompare(b.coinName);
      } else if (sortQuery && sortQuery === "Desc") {
        return b.coinName.localeCompare(a.coinName);
      } else {
        return data;
      }
    });
  };

  const queryIsValid = (item) => {
    return (
      item.coinName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filtering = (data) => {
    // Search And Filter Logic
    return data?.filter((item) => {
      if (!searchQuery && !priceFrom && !priceTo) {
        return item;
      }
      // Search logic
      if (searchQuery && queryIsValid(item)) {
        return item;
      }

      // Range Filter Logic
      if (priceFrom && !priceTo) {
        return +item.price > +priceFrom;
      }
      if (priceTo && !priceFrom) {
        return +item.price < +priceTo;
      }
      if (priceFrom && priceTo) {
        return +item.price > +priceFrom && +item.price < +priceTo;
      }
    });
  };

  return (
    <main className={classes.mainContent}>
      {filtering(coins)?.length === 0 && <p>No Coins Found!</p>}
      <table>
        {filtering(coins)?.length !== 0 && (
          <thead>
            <tr>
              <th>#</th>
              <th>Coin</th>
              <th>Price</th>
              <th>1h</th>
              <th>24h</th>
              <th>7d</th>
              <th>24h Volume</th>
              <th>Mkt Cap</th>
              <th>Last 7 Days</th>
            </tr>
          </thead>
        )}

        <tbody>
          {/* First of all filtering data and then mapping all of them */}
          {sorting(filtering(coins))?.map((coin, i) => (
            <CoinItem
              index={i + 1}
              id={coin.id}
              key={coin.id}
              coinName={coin.coinName}
              imageSrc={coin.imageSrc}
              shortName={coin.shortName.toUpperCase()}
              price={coin.price}
              priceChange24Hour={coin.priceChange24Hour}
              marketCap={coin.marketCap}
              totalVolume={coin.totalVolume}
              priceChangeHour={coin.priceChangeHour}
              priceChange7Days={coin.priceChange7Days}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default CoinsTable;
