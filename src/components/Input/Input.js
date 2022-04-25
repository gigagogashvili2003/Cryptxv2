import classes from "./Input.module.css";

// Custom reusable input component
const Input = ({ type, placeholder, value, onChange, onBlur }) => {
  return (
    <input
      className={classes.input}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};
export default Input;
