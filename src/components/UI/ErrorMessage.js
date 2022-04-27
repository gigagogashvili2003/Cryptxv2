import classes from "./ErrorMessage.module.css";

// Reusable Error Message Component
const ErrorMessage = ({ errorMessage }) => {
  return (
    <div className={classes.error}>
      <h1>{errorMessage}</h1>
    </div>
  );
};

export default ErrorMessage;
