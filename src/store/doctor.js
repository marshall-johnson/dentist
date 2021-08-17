/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'doctor',
  initialState: {
    page: 1,
    items: [],
    totalCount: 0,
    loading: false,
  },
  reducers: {
    setLoading(state, { payload }) {
      state.loading = payload;
    },
    doctorsFetched(state, { payload: { items, totalCount, page } }) {
      state.page = page;
      state.items = items;
      state.totalCount = totalCount;
    }
  },
});

export const {
  setLoading,
  doctorsFetched,
} = slice.actions;

export default slice.reducer;
