import { createSlice } from "@reduxjs/toolkit";

export interface IIsLoadingNewsState {
  isLoadingNews: boolean;
}

const initialState: IIsLoadingNewsState = {
  isLoadingNews: false,
};

const isLoadingNewsSlice = createSlice({
  name: "isLoadingNews",
  initialState,
  reducers: {
    setIsLoadingNews(state, action) {
      state.isLoadingNews = action.payload;
    },
  },
});

export const { setIsLoadingNews } = isLoadingNewsSlice.actions;

export default isLoadingNewsSlice.reducer;
