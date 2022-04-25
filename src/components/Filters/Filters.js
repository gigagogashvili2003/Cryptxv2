import { useDispatch, useSelector } from "react-redux";
import Input from "../Input/Input";
import { filterActions } from "../../store/filterSlice";

import classes from "./Filters.module.css";

const Filters = (props) => {
  const { searchQuery } = useSelector((state) => state.filters.filterState);

  const dispatch = useDispatch();
  // Handlers wich are setting input values inside redux store
  const searchHandler = (e) => {
    dispatch(filterActions.setSearchQuery(e.target.value));
  };

  const priceFromHandler = (e) => {
    dispatch(filterActions.setPriceFromQuery(e.target.value));
  };

  const priceToHandler = (e) => {
    dispatch(filterActions.setPriceToQuery(e.target.value));
  };
  const blurHandler = (e) => {
    dispatch(filterActions.clearSearch());
  };

  const sortHandler = (e) => {
    dispatch(filterActions.setSortQuery(e.target.value));
  };

  return (
    <div className={classes.input}>
      <select
        defaultValue=""
        onChange={sortHandler}
        id="sorting"
        className={classes.select}
      >
        <option value="" disabled defaultValue="">
          Sort By
        </option>
        <option value="Asc">Ascending</option>
        <option value="Desc">Descending</option>
      </select>
      <Input
        onChange={searchHandler}
        onBlur={blurHandler}
        type="text"
        value={searchQuery}
        placeholder="Search by Coin"
      />
      <Input
        onChange={priceFromHandler}
        type="number"
        placeholder="Price From"
      />
      <Input onChange={priceToHandler} type="number" placeholder="Price To" />
    </div>
  );
};

export default Filters;
