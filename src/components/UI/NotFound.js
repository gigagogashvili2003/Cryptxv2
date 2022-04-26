import BackToHomeButton from "../Button/BackToHomeButton";
import classes from "./NotFound.module.css";
const NotFound = () => {
  return (
    <div className={classes.notFound}>
      <h1>Page Not Found!</h1>
      <BackToHomeButton />
    </div>
  );
};

export default NotFound;
