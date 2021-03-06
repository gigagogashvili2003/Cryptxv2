import { useNavigate } from "react-router-dom";
import classes from "./CoinItem.module.css";

// Icon
import { AiOutlineStar } from "react-icons/ai";

// Helper function imports
import { currencyFormatter } from "../../helpers/utils";
import { colorDetect } from "../../helpers/helpers";

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

  // Reusable variable

  const flexiblePrice =
    price < 0.001
      ? currencyFormatter(price, "en-US", "usd", "currency", 7)
      : currencyFormatter(price, "en-US", "usd", "currency", 2);

  return (
    <tr onClick={() => navigate(`/coin/${id}`)}>
      <td>
        <span className={classes.starIcon}>
          <AiOutlineStar />
        </span>
        {index}
      </td>
      <td>
        <div className={classes.groupContent}>
          <img style={{ width: "20px" }} alt="" src={imageSrc} />
          <span className={classes.fullName}>{coinName}</span>
          <span className={classes.abbreviation}>{shortName}</span>
        </div>
      </td>
      <td>{flexiblePrice}</td>
      {/* Adding classname through function, for example function returns classes.greenColor 
      and classname will became classes.greenColor */}
      <td className={colorDetect(priceChangeHour)}>
        {priceChangeHour?.toFixed(1) || 0}%
      </td>
      <td className={colorDetect(priceChange24Hour)}>
        {priceChange24Hour?.toFixed(1) || 0}%
      </td>
      <td className={colorDetect(priceChange7Days)}>
        {priceChange7Days?.toFixed(1) || 0}%
      </td>
      <td>{currencyFormatter(totalVolume, undefined, "usd", "currency", 0)}</td>
      <td>{currencyFormatter(marketCap, "en-US", "usd", "currency", 0)}</td>
    </tr>
  );
};

export default CoinItem;
