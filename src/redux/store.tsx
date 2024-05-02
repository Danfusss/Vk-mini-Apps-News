import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "../redux/slice/newsSlice";
import isLoadingReducer from "./slice/isLoadingReducer";
import isLoadingNewsReducer from "./slice/isLoadingNewsReducer";

const store = configureStore({
  reducer: {
    newsReducer,
    isLoadingReducer,
    isLoadingNewsReducer,
  },
});

export default store;
