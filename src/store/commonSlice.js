import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
  name: "common",
  initialState: {
    curPage: 1,
    totalPages: null,
    globalLoading: false,
  },
  reducers: {
    setCurPage(state, action) {
      state.curPage = action.payload;
    },
    setTotalPages(state, action) {
      state.totalPages = parseInt(action.payload / 100, 10);
    },
    setGlobalLoading(state, action) {
      state.globalLoading = action.payload;
    },
  },
});

export const commonActions = commonSlice.actions;

export default commonSlice;
