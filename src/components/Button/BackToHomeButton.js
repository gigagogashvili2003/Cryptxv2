import { useNavigate } from "react-router-dom";
import classes from "./BackToHomeButton.module.css";

// Reusable Back To Home Button
const BackToHomeButton = (props) => {
  const navigate = useNavigate();
  const goToMainPageHandler = () => {
    navigate("/", { replace: true });
  };

  return (
    <button onClick={goToMainPageHandler} className={classes.backButton}>
      &lt; Back To Main Page
    </button>
  );
};

export default BackToHomeButton;
