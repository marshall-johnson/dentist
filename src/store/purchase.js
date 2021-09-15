/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'purchase',
  initialState: {},
  reducers: {
    setLoading(state, { payload }) {
      state.loading = payload;
    },
  },
});

export const {
  setLoading,
} = slice.actions;

export default slice.reducer;
