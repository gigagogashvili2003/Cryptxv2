import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
  name: "common",
  initialState: {
    curPage: 1,
    totalPages: null,
  },
  reducers: {
    setCurPage(state, action) {
      state.curPage = action.payload;
    },
    setTotalPages(state, action) {
      state.totalPages = parseInt(action.payload / 100, 10);
    },
  },
});

export const commonActions = commonSlice.actions;

export default commonSlice;
