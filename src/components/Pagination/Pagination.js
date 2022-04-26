import { useDispatch, useSelector } from "react-redux";
import classes from "./Pagination.module.css";
import { commonActions } from "../../store/commonSlice";

// Pagination Components
const Pagination = (props) => {
  const { curPage, totalPages } = useSelector((state) => state.commons);

  const dispatch = useDispatch();

  const nextPageHandler = () => {
    dispatch(commonActions.setCurPage(curPage + 1));
  };

  const prevPageHandler = () => {
    dispatch(commonActions.setCurPage(curPage - 1));
  };

  const goToLastPage = () => {
    dispatch(commonActions.setCurPage(totalPages));
  };

  const goToFirstPage = () => {
    dispatch(commonActions.setCurPage(1));
  };

  return (
    <div className={classes.pagination}>
      {/* If curPage is 1 button is disabled, if it's more than 1 it's active */}
      <button
        disabled={curPage === 1}
        className={`${curPage > 1 ? classes.active : classes.disabled}`}
        onClick={goToFirstPage}
      >
        St Page
      </button>

      {/* If curpage is 1 it's disabled also */}
      <button disabled={curPage === 1} onClick={prevPageHandler}>
        &lt;
      </button>
      {/* Showing current page */}
      <button>{curPage}</button>

      {/* Just UI */}
      <button>...</button>

      {/* Showing Total Pages*/}
      <button onClick={goToLastPage}>{totalPages}</button>

      {/* If current page === totalPages for example 6 = 6 it's disabled cuz it's no more pages left*/}
      <button disabled={curPage === totalPages} onClick={nextPageHandler}>
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
