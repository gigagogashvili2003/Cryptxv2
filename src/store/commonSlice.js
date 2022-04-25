import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
  name: "common",
  initialState: {
    curPage: 1,
  },
  reducers: {
    setCurPage(state, action) {
      state.curPage += action.payload;
    },
  },
});

export const commonActions = commonSlice.actions;

export default commonSlice;
