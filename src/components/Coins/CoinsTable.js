import classes from "./CoinsTable.module.css";
import CoinItem from "./CoinItem";
import { useSelector } from "react-redux";
const CoinsTable = ({ coins }) => {
  const { searchQuery, sortQuery, priceFrom, priceTo } = useSelector(
    (state) => state.filters.filterState
  );

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

  return (
    <main className={classes.mainContent}>
      <table>
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
        <tbody>
          {/* First of all filtering data and then mapping all of them */}
          {sorting(coins)?.map((item, i) => (
            <CoinItem
              index={i + 1}
              id={item.id}
              key={item.id}
              coinName={item.coinName}
              imageSrc={item.imageSrc}
              shortName={item.shortName.toUpperCase()}
              price={item.price}
              priceChange24Hour={item.priceChange24Hour}
              marketCap={item.marketCap}
              totalVolume={item.totalVolume}
              priceChangeHour={item.priceChangeHour}
              priceChange7Days={item.priceChange7Days}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default CoinsTable;
