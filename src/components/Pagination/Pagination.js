import { useDispatch, useSelector } from "react-redux";
import classes from "./Pagination.module.css";
import { commonActions } from "../../store/commonSlice";

const Pagination = (props) => {
  const curPage = useSelector((state) => state.commons.curPage);
  const dispatch = useDispatch();
  const totalPages = 137;

  const nextPageHandler = () => {
    dispatch(commonActions.setCurPage(1));
  };

  const prevPageHandler = () => {
    dispatch(commonActions.setCurPage(-1));
  };

  const goToLastPage = () => {
    dispatch(commonActions.setCurPage(totalPages - 1));
  };

  return (
    <div className={classes.pagination}>
      <button disabled={curPage < 2} onClick={prevPageHandler}>
        &lt;
      </button>
      <button>{curPage}</button>
      <button onClick={goToLastPage}>{totalPages}</button>
      <button disabled={curPage > 135} onClick={nextPageHandler}>
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
