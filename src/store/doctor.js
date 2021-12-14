/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { parseInt } from 'lodash';

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
      state.items = items.map((data) => ({
        ...data,
        id: parseInt(data.id),
      }));
      state.totalCount = totalCount;
    },
  },
});

export const { setLoading, doctorsFetched } = slice.actions;

export default slice.reducer;
