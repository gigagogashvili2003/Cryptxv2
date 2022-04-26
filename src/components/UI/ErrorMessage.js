import classes from "./ErrorMessage.module.css";

const ErrorMessage = ({ errorMessage }) => {
  return (
    <div className={classes.error}>
      <h1>{errorMessage}</h1>
    </div>
  );
};

export default ErrorMessage;
