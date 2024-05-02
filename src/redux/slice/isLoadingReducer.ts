import { createSlice } from "@reduxjs/toolkit";

export interface IIsLoadingState {
  isLoading: boolean;
}

const initialState: IIsLoadingState = {
  isLoading: false,
};

const isLoadingSlice = createSlice({
  name: "isLoading",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading } = isLoadingSlice.actions;

export default isLoadingSlice.reducer;
