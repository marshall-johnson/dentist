/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'profitPotential',
  initialState: {
    page: 1,
    loading: false,
  },
  reducers: {
    setLoading(state, { payload }) {
      state.loading = payload;
    },
  },
});

export const { setLoading } = slice.actions;

export default slice.reducer;
