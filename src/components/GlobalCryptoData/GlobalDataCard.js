import classes from "./GlobalDataCard.module.css";
import { colorDetect } from "../../helpers/helpers";

const GlobalDataCard = ({ cardType, value, colorDetector, percantage }) => {
  let borderClasses = "";

  if (colorDetector > 0) {
    borderClasses = classes.greenBorder;
  } else if (colorDetector < 0) {
    borderClasses = classes.redBorder;
  } else {
    borderClasses = classes.grayBorder;
  }

  return (
    <div className={`${classes.card} ${borderClasses}`}>
      <div className={classes.market}>
        <h3>{value}</h3>
        <p className={colorDetect(parseFloat(percantage))}>{percantage}</p>
      </div>
      <div className={classes.cardType}>
        <p>{cardType}</p>
      </div>
    </div>
  );
};

export default GlobalDataCard;
