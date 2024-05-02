import { createSlice } from "@reduxjs/toolkit";
import { INews } from "../../type";

export interface INewsState {
  newsElement: INews | null;
}

const initialState: INewsState = {
  newsElement: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    getNewsData(state, action) {
      state.newsElement = action.payload;
    },
  },
});

export const { getNewsData } = newsSlice.actions;

export default newsSlice.reducer;
