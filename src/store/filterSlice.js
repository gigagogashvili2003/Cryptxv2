import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterState: {
    sortQuery: "",
    searchQuery: "",
    priceFrom: "",
    priceTo: "",
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.filterState.searchQuery = action.payload;
    },
    setSortQuery(state, action) {
      state.filterState.sortQuery = action.payload;
    },
    setPriceFromQuery(state, action) {
      state.filterState.priceFrom = action.payload;
    },
    setPriceToQuery(state, action) {
      state.filterState.priceTo = action.payload;
    },
    clearSearch(state) {
      state.filterState.searchQuery = "";
    },
  },
});

export const filterActions = filterSlice.actions;

export default filterSlice;
