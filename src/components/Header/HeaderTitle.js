import classes from "./HeaderTitle.module.css";

const HeaderTitle = () => {
  return (
    // Main Header Title
    <header className={classes.header}>
      <h1>Cryptocurrency Prices by Market Cap</h1>
    </header>
  );
};

export default HeaderTitle;
