import classes from "./CoinItem.module.css";
import { currencyFormatter } from "../../helpers/utils";
import { useNavigate } from "react-router-dom";

const colorDetect = (price) => {
  let percantageColor;

  if (price < 0) {
    percantageColor = classes.redColor;
  } else {
    percantageColor = classes.greenColor;
  }

  return percantageColor;
};

const CoinItem = ({
  index,
  coinName,
  price,
  shortName,
  imageSrc,
  priceChange24Hour,
  marketCap,
  totalVolume,
  priceChangeHour,
  priceChange7Days,
  id,
}) => {
  const navigate = useNavigate();

  const flexiblePrice =
    price < 0.001
      ? currencyFormatter(price, "en-US", 7)
      : currencyFormatter(price, "en-US", 2);

  return (
    <tr onClick={() => navigate(`/coin/${id}`)}>
      <td>
        <span className={classes.starIcon}>S</span>
        {index}
      </td>
      <td>
        <div className={classes.groupContent}>
          <img style={{ width: "20px" }} alt="some img" src={imageSrc} />
          <span className={classes.fullName}>{coinName}</span>
          <span className={classes.abbreviation}>{shortName}</span>
        </div>
      </td>
      <td>{flexiblePrice}</td>
      {/* Adding classname through function, for example function returns classes.greenColor 
      and classname will became classes.greenColor */}
      <td className={colorDetect(priceChangeHour)}>
        {priceChangeHour.toFixed(2)}%
      </td>
      <td className={colorDetect(priceChange24Hour)}>
        {priceChange24Hour.toFixed(2)}%
      </td>
      <td className={colorDetect(priceChange7Days)}>
        {priceChange7Days.toFixed(2)}%
      </td>
      <td>{currencyFormatter(totalVolume, undefined, 0)}</td>
      <td>{currencyFormatter(marketCap, "en-US", 0)}</td>
      <td>Not Done</td>
    </tr>
  );
};

export default CoinItem;
