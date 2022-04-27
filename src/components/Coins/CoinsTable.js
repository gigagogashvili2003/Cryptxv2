import { useSelector } from "react-redux";
import classes from "./CoinsTable.module.css";

// Component Imports
import CoinItem from "./CoinItem";
import ErrorMessage from "../UI/ErrorMessage";
import LoadingSpinner from "../UI/LoadingSpinner";

const CoinsTable = ({ coinsState }) => {
  // Provided data throught props
  const { coins, isLoading, error } = coinsState;

  const { searchQuery, sortQuery, priceFrom, priceTo } = useSelector(
    (state) => state.filters.filterState
  );

  // Checking States

  if (error) {
    return <ErrorMessage errorMessage={error} />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isLoading && (!coins || coins?.length === 0)) {
    return <p>No Coins Found!</p>;
  }

  // Sorting Logic
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

  // Checking if coinName or shortName includes searchQuery
  const queryIsValid = (item) => {
    return (
      item.coinName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Filtering Logic
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
      {/* For example if user typed some text and program didnot find suitable data it will dispolay
      No Coins Found! */}
      {filtering(coins)?.length === 0 && <p>No Coins Found!</p>}
      <table>
        {/* If havenot coins we didn't need thead anymore */}
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
