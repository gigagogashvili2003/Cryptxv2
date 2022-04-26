import { useReducer } from "react";
import { useCallback } from "react";
import { commonActions } from "../store/commonSlice";
import { useDispatch } from "react-redux";
const httpReducer = (state, action) => {
  if (action.type === "SEND") {
    return {
      data: null,
      error: null,
      status: "pending",
    };
  }

  if (action.type === "SUCCESS") {
    return {
      data: action.responseData,
      error: null,
      status: "completed",
    };
  }

  if (action.type === "ERROR") {
    return {
      data: null,
      error: action.errorMessage,
      status: "completed",
    };
  }

  return state;
};

function useHttp(reqFunc) {
  const dispatch = useDispatch();
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    status: null,
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    async (reqData) => {
      dispatchHttp({ type: "SEND" });
      dispatch(commonActions.setGlobalLoading(true));
      try {
        const responseData = await reqFunc(reqData);

        dispatchHttp({ type: "SUCCESS", responseData });
        dispatch(commonActions.setGlobalLoading(false));
      } catch (error) {
        dispatchHttp({
          type: "ERROR",
          errorMessage: error.message || "Something went wrong!",
        });
      }
    },
    [reqFunc]
  );

  return {
    sendRequest,
    ...httpState,
  };
}

export default useHttp;
