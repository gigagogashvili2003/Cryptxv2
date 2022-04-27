import BackToHomeButton from "../Button/BackToHomeButton";
import classes from "./NotFound.module.css";

// If Certain route not matched this page will appear
// Reusable notfound component
const NotFound = () => {
  return (
    <div className={classes.notFound}>
      <h1>Page Not Found!</h1>
      <BackToHomeButton />
    </div>
  );
};

export default NotFound;
