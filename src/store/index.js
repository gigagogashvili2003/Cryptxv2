import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filterSlice";
import commonSlice from "./commonSlice";

const store = configureStore({
  reducer: {
    filters: filterSlice.reducer,
    commons: commonSlice.reducer,
  },
});

export default store;
